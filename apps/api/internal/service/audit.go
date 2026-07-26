package service

import (
	"context"

	"github.com/google/uuid"
)

// AuditEntry is a single row destined for the audit_logs table (migration
// 011). Kept narrow — this is a hook point for the companion audit-log
// issue, not a general audit framework.
type AuditEntry struct {
	UserID     *uuid.UUID
	Action     string
	EntityType string
	EntityID   uuid.UUID
	OldValue   any
	NewValue   any
	IPAddress  string
}

type AuditLogger interface {
	Log(ctx context.Context, entry AuditEntry) error
}

// NoopAuditLogger discards audit entries. Used only if a Postgres connection
// isn't available to wire the real logger.
type NoopAuditLogger struct{}

func (NoopAuditLogger) Log(context.Context, AuditEntry) error { return nil }
