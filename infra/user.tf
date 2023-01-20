// Create IAM User
resource "aws_iam_user" "mern_auth_user" {
  name = "mern_auth_user"
  path = "/system/"
}

// Creates keys for that user
resource "aws_iam_access_key" "mern_auth_user" {
  user = aws_iam_user.mern_auth_user.name
}

// Create access policy from template
data "mern_auth_access_policy" "policy" {
  template = file("${path.module}/templates/s3_access_policy.json")

  vars {
    bucket_name = "${var.bucket_name}"
  }
}

// Attach access policy to user
resource "aws_iam_user_policy" "mern_auth_user_policy" {
  name   = "mern_auth_user_policy"
  user   = aws_iam_user.mern_auth_user.name
  policy = data.mern_auth_template_policy.policy.rendered
}