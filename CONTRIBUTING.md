# Contributing to LoadBoard AI + TMS Platform

Thank you for your interest in contributing to the LoadBoard AI platform! This document provides guidelines and instructions for contributing to the project.

## 🤝 Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- Git
- Python 3.10+ (for backend contributions)

### Setting Up Your Development Environment

1. **Fork the repository** to your GitHub account

2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/YOUR-USERNAME/ai-logisticpowerboard.git
   cd ai-logisticpowerboard
   ```

3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/AlazieXGit/ai-logisticpowerboard.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Set up environment variables**:
   - Copy `.env.example` to `.env.development`
   - Fill in your configuration values (never commit these files!)

6. **Start the development server**:
   ```bash
   npm run dev
   ```

## 📝 How to Contribute

### Reporting Issues

Before creating a new issue, please:
1. Search existing issues to avoid duplicates
2. Check the documentation for solutions
3. Use the appropriate issue template:
   - **Bug Report**: For reporting bugs or errors
   - **Feature Request**: For suggesting new features
   - **Documentation**: For documentation improvements
   - **Security**: For security vulnerabilities (consider private disclosure)
   - **General**: For other types of issues

### Submitting Changes

1. **Create a new branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**:
   - Write clean, maintainable code
   - Follow existing code style and conventions
   - Add comments for complex logic
   - Update documentation as needed

3. **Test your changes**:
   ```bash
   # Run linting
   npm run lint
   
   # Run tests (if applicable)
   npm test
   
   # Build to check for errors
   npm run build
   
   # For Python changes
   flake8 .
   pytest
   ```

4. **Commit your changes**:
   - Use clear, descriptive commit messages
   - Follow conventional commit format:
     ```
     type(scope): brief description
     
     Detailed description if needed
     ```
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
   - Example: `feat(dispatch): add auto-dispatch scheduling feature`

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**:
   - Use the PR template
   - Link related issues
   - Provide clear description of changes
   - Add screenshots for UI changes
   - Wait for review and address feedback

## 🎨 Code Style Guidelines

### JavaScript/TypeScript

- Use TypeScript for type safety
- Follow ESLint configuration
- Use functional components with hooks
- Keep components focused and reusable
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### Python

- Follow PEP 8 style guide
- Use type hints where applicable
- Write docstrings for functions and classes
- Keep functions small and focused

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow existing component patterns
- Keep styles consistent with design system
- Avoid inline styles unless necessary

## 🧪 Testing Guidelines

- Write tests for new features
- Ensure existing tests pass
- Test edge cases and error conditions
- Include integration tests where appropriate
- Aim for meaningful test coverage

## 📚 Documentation

When contributing, please:
- Update README if adding new features
- Document API changes
- Add code comments for complex logic
- Update setup instructions if needed
- Create or update relevant documentation files

## 🔒 Security Guidelines

- **Never commit sensitive data** (API keys, passwords, tokens)
- Use environment variables for configuration
- Review [SECURITY.md](SECURITY.md) for security policies
- Report security vulnerabilities privately
- Validate and sanitize user inputs
- Follow security best practices

## 🏗️ Project Structure

```
ai-logisticpowerboard/
├── src/                  # Frontend source code
│   ├── components/       # React components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── contexts/         # React contexts
│   └── lib/              # Utility functions
├── backend-fastapi/      # Backend API code
├── public/               # Static assets
├── .github/              # GitHub templates and workflows
└── docs/                 # Additional documentation
```

## 🔄 Pull Request Review Process

1. **Automated checks** run on your PR:
   - Linting
   - Tests
   - Build verification

2. **Code review** by maintainers:
   - Code quality
   - Testing coverage
   - Documentation
   - Security considerations

3. **Feedback and iteration**:
   - Address reviewer comments
   - Make requested changes
   - Push updates to your branch

4. **Merge**:
   - Once approved, your PR will be merged
   - Your contribution will be part of the next release!

## 🏷️ Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or fixes
- `chore/` - Maintenance tasks

## 🎯 Contribution Areas

We welcome contributions in:
- **Frontend Development**: React components, UI/UX improvements
- **Backend Development**: API endpoints, business logic
- **Documentation**: Guides, tutorials, API docs
- **Testing**: Unit tests, integration tests
- **Performance**: Optimization, caching strategies
- **Security**: Security audits, vulnerability fixes
- **DevOps**: CI/CD improvements, deployment scripts
- **Design**: UI/UX design, mockups

## 💬 Getting Help

If you need help:
- Check existing documentation
- Search closed issues
- Ask in GitHub Discussions
- Contact maintainers

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## 🙏 Recognition

All contributors will be recognized in our project. Thank you for making LoadBoard AI better!

---

**Questions?** Feel free to reach out by creating a discussion or contacting the maintainers.

Thank you for contributing to LoadBoard AI! 🚀
