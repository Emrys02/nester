package postgres

import (
	"context"
	"database/sql"
	"time"

	"github.com/google/uuid"
	"github.com/suncrestlabs/nester/apps/api/internal/domain/usersignal"
)

// maxRecentEvents bounds ListRecentEvents so a highly active user's 30-day
// window can't force an unbounded scan/transfer — responsive-window
// inference only needs a representative sample of recent activity hours,
// not the full history.
const maxRecentEvents = 500

type ActivityEventRepository struct {
	db *sql.DB
}

func NewActivityEventRepository(db *sql.DB) *ActivityEventRepository {
	return &ActivityEventRepository{db: db}
}

func (r *ActivityEventRepository) RecordEvent(ctx context.Context, userID uuid.UUID, eventType usersignal.EventType, occurredAt time.Time) error {
	_, err := r.db.ExecContext(ctx, `
		INSERT INTO activity_events (user_id, event_type, occurred_at)
		VALUES ($1, $2, $3)
	`, userID, eventType, occurredAt)
	return err
}

func (r *ActivityEventRepository) ListRecentEvents(ctx context.Context, userID uuid.UUID, since time.Time) ([]usersignal.ActivityEvent, error) {
	rows, err := r.db.QueryContext(ctx, `
		SELECT id, user_id, event_type, occurred_at
		FROM activity_events
		WHERE user_id = $1 AND occurred_at >= $2
		ORDER BY occurred_at DESC
		LIMIT $3
	`, userID, since, maxRecentEvents)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var events []usersignal.ActivityEvent
	for rows.Next() {
		var e usersignal.ActivityEvent
		if err := rows.Scan(&e.ID, &e.UserID, &e.EventType, &e.OccurredAt); err != nil {
			return nil, err
		}
		events = append(events, e)
	}
	return events, nil
}
