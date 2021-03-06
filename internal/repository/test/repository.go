package test

import (
	"github.com/porter-dev/porter/internal/repository"
)

// NewRepository returns a Repository which persists users in memory
// and accepts a parameter that can trigger read/write errors
func NewRepository(canQuery bool) *repository.Repository {
	return &repository.Repository{
		User:             NewUserRepository(canQuery),
		Session:          NewSessionRepository(canQuery),
		Project:          NewProjectRepository(canQuery),
		Cluster:          NewClusterRepository(canQuery),
		Registry:         NewRegistryRepository(canQuery),
		GitRepo:          NewGitRepoRepository(canQuery),
		KubeIntegration:  NewKubeIntegrationRepository(canQuery),
		OIDCIntegration:  NewOIDCIntegrationRepository(canQuery),
		OAuthIntegration: NewOAuthIntegrationRepository(canQuery),
		GCPIntegration:   NewGCPIntegrationRepository(canQuery),
		AWSIntegration:   NewAWSIntegrationRepository(canQuery),
	}
}
