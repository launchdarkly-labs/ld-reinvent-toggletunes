provider "launchdarkly" {
  access_token = "your-access-token"
}

resource "launchdarkly_project" "ToggleTunes_Team1" {
  key  = "toggletunes-team1-tf"
  name = "ToggleTunes - Team 1 TF"
  default_client_side_availability {
    using_environment_id = true
  }
}

resource "launchdarkly_environment" "test" {
  key                 = "test"
  name                = "Test"
  project_key         = launchdarkly_project.ToggleTunes_Team1.key
  client_side_availability {
    using_environment_id = true
  }
}

output "server_sdk_key" {
  value = launchdarkly_environment.test.sdk_key
}

output "client_sdk_key" {
  value = launchdarkly_environment.test.client_side_id
}
