import yaml
import os


def test_issue_templates_are_valid_yaml():
    """Test that all issue template YAML files are valid."""
    template_dir = ".github/ISSUE_TEMPLATE"
    template_files = [
        "bug_report.yml",
        "feature_request.yml",
        "documentation.yml",
        "security.yml",
        "general.yml",
        "config.yml"
    ]

    for template_file in template_files:
        filepath = os.path.join(template_dir, template_file)
        assert os.path.exists(filepath), f"Template file {template_file} not found"

        with open(filepath, 'r') as f:
            try:
                data = yaml.safe_load(f)
                assert data is not None, f"Template {template_file} is empty"

                # Validate structure based on file type
                if template_file != "config.yml":
                    # Issue form templates should have these fields
                    assert 'name' in data, f"Template {template_file} missing 'name' field"
                    assert 'description' in data, f"Template {template_file} missing 'description' field"
                    assert 'body' in data, f"Template {template_file} missing 'body' field"
                else:
                    # Config file should have different structure
                    assert 'blank_issues_enabled' in data, "config.yml missing 'blank_issues_enabled'"

            except yaml.YAMLError as e:
                assert False, f"Invalid YAML in {template_file}: {e}"


def test_contributing_file_exists():
    """Test that CONTRIBUTING.md file exists."""
    assert os.path.exists("CONTRIBUTING.md"), "CONTRIBUTING.md file not found"

    with open("CONTRIBUTING.md", 'r') as f:
        content = f.read()
        assert len(content) > 0, "CONTRIBUTING.md is empty"
        assert "Contributing" in content, "CONTRIBUTING.md missing 'Contributing' title"
        assert "Code of Conduct" in content, "CONTRIBUTING.md missing code of conduct section"


def test_pr_template_exists():
    """Test that pull request template exists."""
    pr_template = ".github/pull_request_template.md"
    assert os.path.exists(pr_template), "PR template not found"

    with open(pr_template, 'r') as f:
        content = f.read()
        assert len(content) > 0, "PR template is empty"
        assert "Description" in content, "PR template missing description section"
        assert "Type of Change" in content, "PR template missing type of change section"


def test_readme_updated():
    """Test that README.md has been updated with contributing links."""
    with open("README.md", 'r') as f:
        content = f.read()
        assert "CONTRIBUTING.md" in content, "README.md not updated with CONTRIBUTING.md link"
        assert "Contributing" in content, "README.md missing Contributing section"
