variable "bucket_name" {
    default = "mern_auth_bucket"
}

resource "aws_s3_bucket" "prod_bucket" {
    bucket = "${var.bucket_name}"
    acl = "public-read" 
    policy = <<EOF
{
    "Version": "2008-10-17",
    "Statement": [
    {
        "Sid": "PublicReadForGetBucketObjects",
        "Effect": "Allow",
        "Principal": {
            "AWS": "*"
        },
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::${var.bucket_name}/*"
    }, {
        "Sid": "PrivateSetForSetBucketObjects",
        "Effect": "Allow",
        "Principal": {
            "AWS": "${aws_iam_user.mern_auth_user.arn}"
        },
        "Action": "s3:*",
        "Resource": [
            "arn:aws:s3:::${var.bucket_name}",
            "arn:aws:s3:::${var.bucket_name}/*"
        ]
    }]
}
EOF

    website {
        index_document = "index.html"
        error_document = "index.html"
    }
}
