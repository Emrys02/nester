package postgres

import (
	"context"
	"database/sql"
	"encoding/json"

	"github.com/suncrestlabs/nester/apps/api/internal/service"
)

// PostgresAuditLogger writes AuditEntry values to the existing audit_logs
// table (migration 011). Kept narrow — this is not a general audit
// framework, just enough to satisfy service.AuditLogger for session-security
// events (entity_type "session").
type PostgresAuditLogger struct {
	db *sql.DB
}

func NewPostgresAuditLogger(db *sql.DB) *PostgresAuditLogger {
	return &PostgresAuditLogger{db: db}
}

func (l *PostgresAuditLogger) Log(ctx context.Context, e service.AuditEntry) error {
	oldJSON, err := json.Marshal(e.OldValue)
	if err != nil {
		return err
	}
	newJSON, err := json.Marshal(e.NewValue)
	if err != nil {
		return err
	}

	var userID any
	if e.UserID != nil {
		userID = *e.UserID
	}

	_, err = l.db.ExecContext(ctx, `
		INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_value, new_value, ip_address)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
	`, userID, e.Action, e.EntityType, e.EntityID, oldJSON, newJSON, nullSQLString(e.IPAddress))
	return err
}
