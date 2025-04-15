variable "aws_region" {
  description = "AWS region"
  default     = "ap-south-1"
}

variable "ami_id" {
  description = "AMI ID for Amazon Linux 2"
  default     = "ami-002f6e91abff6eb96"  # Amazon Linux 2 in us-east-1, update as needed
}

variable "instance_type" {
  description = "EC2 instance type"
  default     = "t3.micro"
}

variable "key_name" {
  description = "EC2 key pair name"
  default     = "noteme-key"  # Create this key pair in AWS console first
}

variable "project_name" {
  description = "Project name used for tagging"
  default     = "note.me"
}