package service_test

import (
	"context"
	"errors"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/suncrestlabs/nester/apps/api/internal/domain/toolaudit"
	"github.com/suncrestlabs/nester/apps/api/internal/service"
)

type mockToolAuditRepo struct {
	latestHash string
	latestErr  error
	insertErr  error
	inserted   *toolaudit.ToolInvocation
}

func (m *mockToolAuditRepo) InsertChained(ctx context.Context, inv toolaudit.ToolInvocation) (toolaudit.ToolInvocation, error) {
	if m.latestErr != nil {
		return toolaudit.ToolInvocation{}, m.latestErr
	}
	if m.insertErr != nil {
		return toolaudit.ToolInvocation{}, m.insertErr
	}
	inv.PrevHash = m.latestHash
	var err error
	inv.EntryHash, err = inv.ComputeHash(m.latestHash)
	if err != nil {
		return toolaudit.ToolInvocation{}, err
	}
	m.inserted = &inv
	return inv, nil
}

func TestToolAuditService_Record(t *testing.T) {
	input := toolaudit.ToolInvocation{
		UserID:         "user-1",
		RequestID:      "req-1",
		ConversationID: "conv-1",
		ToolName:       "test-tool",
		Arguments:      []byte(`{"foo":"bar"}`),
	}

	tests := []struct {
		name    string
		repo    *mockToolAuditRepo
		wantErr error
	}{
		{
			name: "success",
			repo: &mockToolAuditRepo{latestHash: "genesis-hash"},
		},
		{
			name:    "latest hash retrieval failure",
			repo:    &mockToolAuditRepo{latestErr: errors.New("db: read latest hash failed")},
			wantErr: errors.New("db: read latest hash failed"),
		},
		{
			name:    "insert failure",
			repo:    &mockToolAuditRepo{latestHash: "genesis-hash", insertErr: errors.New("db: insert failed")},
			wantErr: errors.New("db: insert failed"),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			svc := service.NewToolAuditService(tt.repo)

			result, err := svc.Record(context.Background(), input)

			if tt.wantErr != nil {
				assert.EqualError(t, err, tt.wantErr.Error())
				return
			}

			assert.NoError(t, err)
			assert.NotEmpty(t, result.ID)
			assert.False(t, result.CreatedAt.IsZero())
			assert.Equal(t, "genesis-hash", result.PrevHash)
			assert.NotEmpty(t, result.EntryHash)
			assert.Equal(t, result, *tt.repo.inserted)
		})
	}
}
