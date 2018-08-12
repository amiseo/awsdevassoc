# AWS Developer Associate - Elastic Beanstalk
AWS Elastic Beanstalk is an easy-to-use service for deploying and scaling web applications and services developed with Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker on familiar servers such as Apache, Nginx, Passenger, and IIS.  

## CLI Command Examlpes

**Install EB CLI**
```
pip install awsebcli --upgrade --user
```
ubuntu@adgu:~$ eb
usage: eb (sub-commands ...) [options ...] {arguments ...}

Welcome to the Elastic Beanstalk Command Line Interface (EB CLI). 
For more information on a specific command, type "eb {cmd} --help".

commands:
  abort        Cancels an environment update or deployment.
  appversion   Listing and managing application versions
  clone        Clones an environment.
  codesource   Configures the code source for the EB CLI to use by default.
  config       Modify an environment's configuration. Use subcommands to manage saved configurations.
  console      Opens the environment in the AWS Elastic Beanstalk Management Console.
  create       Creates a new environment.
  deploy       Deploys your source code to the environment.
  events       Gets recent events.
  health       Shows detailed environment health.
  init         Initializes your directory with the EB CLI. Creates the application.
  labs         Extra experimental commands.
  list         Lists all environments.
  local        Runs commands on your local machine.
  logs         Gets recent logs.
  open         Opens the application URL in a browser.
  platform     Commands for managing platforms.
  printenv     Shows the environment variables.
  restore      Restores a terminated environment.
  scale        Changes the number of running instances.
  setenv       Sets environment variables.
  ssh          Opens the SSH client to connect to an instance.
  status       Gets environment information and status.
  swap         Swaps two environment CNAMEs with each other.
  tags         Allows adding, deleting, updating, and listing of environment tags.
  terminate    Terminates the environment.
  upgrade      Updates the environment to the most recent platform version.
  use          Sets default environment.

optional arguments:
  -h, --help            show this help message and exit
  --debug               toggle debug output
  --quiet               suppress all output
  -v, --verbose         toggle verbose output
  --profile PROFILE     use a specific profile from your credential file
  -r REGION, --region REGION
                        use a specific region
  --no-verify-ssl       do not verify AWS SSL certificates
  --version             show application/version info

To get started type "eb init". Then type "eb create" and "eb open"
```
