
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
}

provider "aws" {
  region = "eu-central-1"
}

/*
resource "aws_instance" "api_server" {
  ami           = "ami-05ff5eaef6149df49" // Amazon Linux 2 64 bits
  instance_type = "t2.micro"

  tags = {
    Name = "APIServerInstance"
  }
}
*/
// https://notes.webutvikling.org/s3-bucket-cloudfront-using-terraform/

