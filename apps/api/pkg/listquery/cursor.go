package listquery

import (
	"encoding/base64"
	"fmt"
	"strings"
	"time"

	"github.com/google/uuid"
)

// SettlementCursor identifies the last row of a page for keyset pagination.
//
// Deprecated: this is a thin, forward-only wrapper kept for source
// compatibility. New code should use KeysetCursor directly, which also
// supports backward (Prev) pagination.
type SettlementCursor struct {
	CreatedAt time.Time
	ID        uuid.UUID
}

// EncodeSettlementCursor returns a URL-safe cursor token.
//
// Deprecated: use EncodeKeysetCursor.
func EncodeSettlementCursor(createdAt time.Time, id uuid.UUID) string {
	return EncodeKeysetCursor(KeysetCursor{
		SortValue: createdAt.UTC().Format(time.RFC3339Nano),
		ID:        id,
	})
}

// DecodeSettlementCursor parses a cursor token from the client. Falls back to
// the pre-keyset-refactor token format ("timestamp|id", no direction prefix)
// when DecodeKeysetCursor can't parse it, so a cursor issued just before a
// deploy doesn't break a client mid-pagination.
//
// Deprecated: use DecodeKeysetCursor.
func DecodeSettlementCursor(token string) (SettlementCursor, error) {
	kc, err := DecodeKeysetCursor(token)
	if err == nil {
		createdAt, perr := time.Parse(time.RFC3339Nano, kc.SortValue)
		if perr != nil {
			return SettlementCursor{}, fmt.Errorf("%w: invalid cursor timestamp", ErrInvalidQuery)
		}
		return SettlementCursor{CreatedAt: createdAt.UTC(), ID: kc.ID}, nil
	}
	return decodeLegacySettlementCursor(token)
}

func decodeLegacySettlementCursor(token string) (SettlementCursor, error) {
	raw, err := base64.RawURLEncoding.DecodeString(token)
	if err != nil {
		return SettlementCursor{}, fmt.Errorf("%w: invalid cursor", ErrInvalidQuery)
	}
	parts := strings.SplitN(string(raw), "|", 2)
	if len(parts) != 2 {
		return SettlementCursor{}, fmt.Errorf("%w: invalid cursor payload", ErrInvalidQuery)
	}
	createdAt, err := time.Parse(time.RFC3339Nano, parts[0])
	if err != nil {
		return SettlementCursor{}, fmt.Errorf("%w: invalid cursor timestamp", ErrInvalidQuery)
	}
	id, err := uuid.Parse(parts[1])
	if err != nil {
		return SettlementCursor{}, fmt.Errorf("%w: invalid cursor id", ErrInvalidQuery)
	}
	return SettlementCursor{CreatedAt: createdAt.UTC(), ID: id}, nil
}
