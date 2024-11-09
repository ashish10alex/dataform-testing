# Dataform Testing Ground Repository

## Description
This repository provides a testing ground for Dataform features, including CLI, Core, BigQuery integration, and SQLFluff integration. It requires a Google Cloud project with several APIs enabled (BigQuery, Dataform, etc.) and access to the public Stack Overflow dataset. The development environment setup involves Python, Node.js, the Google Cloud SDK, and the Dataform CLI. Detailed instructions for authentication, project setup, and compilation are included. The README also provides a comprehensive list of references to Dataform and Google Cloud documentation.

## Table of Contents
- [Dataform Testing Ground Repository](#dataform-testing-ground-repository)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
    - [Google Cloud](#google-cloud)
    - [Important Note](#important-note)
    - [Development Environment](#development-environment)
  - [References](#references)
    - [Dataform](#dataform)
    - [Google Cloud](#google-cloud-1)
  - [Repository Structure](#repository-structure)
  - [License](#license)
  - [Authors](#authors)

## Requirements
### Google Cloud
- Create a Google Cloud Project
- Enable the following APIs (they should be enabled by default, but double check):
  - `analyticshub.googleapis.com`
  - `bigquery.googleapis.com`
  - `bigqueryconnection.googleapis.com`
  - `bigquerydatapolicy.googleapis.com`
  - `bigquerydatatransfer.googleapis.com`
  - `bigquerymigration.googleapis.com`
  - `bigqueryreservation.googleapis.com`
  - `bigquerystorage.googleapis.com`
  - `dataform.googleapis.com`
  - `dataplex.googleapis.com`
  - `storage-component.googleapis.com`
  - `storage-api.googleapis.com`
  - `storage.googleapis.com`
- Access Public Dataset [stackoverflow](https://console.cloud.google.com/bigquery?p=bigquery-public-data&d=stackoverflow&page=dataset)

### Important Note
- The public dataset `bigquery-public-data.stackoverflow` is used in this repository. You will need to set your region to `US` to access this dataset in both the `workflow_settings.yaml` and the `.df-credentials.json` file.

### Development Environment
- Install [Python](https://www.python.org/downloads/) (v3.10 or higher)
- Install [Node.js](https://nodejs.org/en/download/) (v20 or higher)
- Install [Google Cloud SDK](https://cloud.google.com/sdk/docs)
- Install [Dataform CLI](https://cloud.google.com/dataform/docs/use-dataform-cli) (v3.0 or higher, it is recommended to install it globally)
- Authenticate with Google Cloud SDK using the following commands:
  - `gcloud auth login` (This will open a browser window to authenticate with your Google Account)
  - `gcloud config set project <PROJECT_ID>` (replace `<PROJECT_ID>` with your Google Cloud Project ID you created earlier)
  - `gcloud auth application-default login` (This sets up the application default credentials for your project)
  - `gcloud auth application-default set-quota-project <PROJECT_ID>` (This sets the quota project for your project)
- Setup dataform authentication:
  - `dataform init-creds`
    - You will then be prompted to select your region, 1 for US, 2 for EU or 3 for Other, select the appropriate region
      - If you select 3, you will be prompted to enter the region, enter the region i.e. `australia-southeast1`
    - You will then be prompted for ADC (default) or JSON Key (Service Account Keyfile), select the appropriate option
      - If you select JSON Key, you will be prompted to enter the path to the JSON Keyfile
      - If you select ADC, you will be prompted to enter your Google Cloud Billing Project ID
  - OR create a `.df-credentials.json` file in the root of the directory with the following content for ADC:
    ```json
    {
      "projectId": "<PROJECT_ID>",
      "location": "<REGION>",
    }
    ```
- Clone your dataform repository
- Navigate to your dataform repository
  - `cd <REPOSITORY_PATH>`
- Install dataform dependencies:
  - `dataform install` (This will install the necessary dependencies for your dataform project)
- Compile your dataform project:
  - `dataform compile` (This will compile your dataform project, if there are no errors, you are good to go)

## References
### Dataform
- [Documentation](https://cloud.google.com/dataform/docs/overview)
- [Best Practices](https://cloud.google.com/dataform/docs/best-practices)
- [Troubleshooting](https://cloud.google.com/dataform/docs/troubleshooting)
- [Core Github](https://github.com/dataform-co/dataform)
- [API Reference](https://cloud.google.com/dataform/reference/rest)
- [Core Reference](https://cloud.google.com/dataform/docs/reference/dataform-core-reference)
- [CLI Reference](https://cloud.google.com/dataform/docs/reference/dataform-cli-reference)
- [Stackoverflow Dataform Reference](https://github.com/dataform-co/dataform/tree/main/examples/stackoverflow_reporter)

### Google Cloud
- [BigQuery](https://cloud.google.com/bigquery/docs)
- [Stackoverflow Public Dataset](https://console.cloud.google.com/bigquery?p=bigquery-public-data&d=stackoverflow&page=dataset)

## Repository Structure
```
.
├── .vscode-dataform-tools  // VSCode Dataform extension tools
│   └── .sqlfluff        // SQLFluff configuration for Dataform
├── definitions           // Dataform definitions
│   ├── 0_sources        // Data sources (raw data)
│   ├── 1_intermediate   // Intermediate/staging ("silver") tables
│   ├── 2_outputs        // Output/final ("gold") tables
│   ├── 3_assertions     // Data quality assertions
│   ├── 4_extras         // Operations, functions, scripts, etc.
│   └── 5_schemas        // BigQuery JSON schema files (optional)
├── includes             // Dataform includes (reusable JS code)
├── .gitignore           // Files and directories ignored by Git
├── LICENSE              // Project license
├── README.md            // Project description and documentation
└── workflow_settings.yaml // Dataform workflow settings
```

## License
This repository is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors
- [Benjamin Western](https://benjaminwestern.io)