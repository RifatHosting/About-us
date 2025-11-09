'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Copy, Download, Github, Star, GitBranch, Package, Users, Shield, Zap, Code, FileText, CheckCircle } from 'lucide-react'

export default function ReadmeGenerator() {
  const [projectInfo, setProjectInfo] = useState({
    projectName: '',
    description: '',
    version: '1.0.0',
    author: '',
    license: 'MIT',
    repository: '',
    homepage: '',
    badges: true,
    installation: '',
    usage: '',
    contributing: '',
    tests: '',
    acknowledgments: ''
  })

  const [generatedReadme, setGeneratedReadme] = useState('')
  const [copied, setCopied] = useState(false)

  const generateReadme = () => {
    let readme = ''

    // Header
    if (projectInfo.projectName) {
      readme += `# ${projectInfo.projectName}\n\n`
    }

    // Badges
    if (projectInfo.badges) {
      readme += `![GitHub stars](https://img.shields.io/github/stars/${projectInfo.repository.split('github.com/')[1] || 'username/repo'})`
      readme += ` ![GitHub forks](https://img.shields.io/github/forks/${projectInfo.repository.split('github.com/')[1] || 'username/repo'})`
      readme += ` ![GitHub issues](https://img.shields.io/github/issues/${projectInfo.repository.split('github.com/')[1] || 'username/repo'})`
      readme += ` ![GitHub license](https://img.shields.io/github/license/${projectInfo.repository.split('github.com/')[1] || 'username/repo'})`
      readme += ` ![Version](https://img.shields.io/badge/version-${projectInfo.version}-blue.svg)\n\n`
    }

    // Description
    if (projectInfo.description) {
      readme += `${projectInfo.description}\n\n`
    }

    // Table of Contents
    readme += `## Table of Contents\n\n`
    readme += `- [Installation](#installation)\n`
    readme += `- [Usage](#usage)\n`
    if (projectInfo.contributing) readme += `- [Contributing](#contributing)\n`
    if (projectInfo.tests) readme += `- [Tests](#tests)\n`
    readme += `- [License](#license)\n`
    if (projectInfo.acknowledgments) readme += `- [Acknowledgments](#acknowledgments)\n\n`

    // Installation
    if (projectInfo.installation) {
      readme += `## Installation\n\n`
      readme += `${projectInfo.installation}\n\n`
    }

    // Usage
    if (projectInfo.usage) {
      readme += `## Usage\n\n`
      readme += `${projectInfo.usage}\n\n`
    }

    // Contributing
    if (projectInfo.contributing) {
      readme += `## Contributing\n\n`
      readme += `${projectInfo.contributing}\n\n`
    }

    // Tests
    if (projectInfo.tests) {
      readme += `## Tests\n\n`
      readme += `${projectInfo.tests}\n\n`
    }

    // License
    readme += `## License\n\n`
    readme += `This project is licensed under the ${projectInfo.license} License - see the [LICENSE](LICENSE) file for details.\n\n`

    // Acknowledgments
    if (projectInfo.acknowledgments) {
      readme += `## Acknowledgments\n\n`
      readme += `${projectInfo.acknowledgments}\n\n`
    }

    // Author info
    if (projectInfo.author) {
      readme += `## Author\n\n`
      readme += `${projectInfo.author}\n\n`
    }

    setGeneratedReadme(readme)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedReadme)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const downloadReadme = () => {
    const blob = new Blob([generatedReadme], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'README.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setProjectInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Github className="h-10 w-10 text-slate-600 dark:text-slate-400" />
            <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200">
              README Generator
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Create professional README files for your GitHub projects in seconds
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              No API Required
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Client-side Only
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Code className="h-3 w-3" />
              Markdown Format
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Project Information
              </CardTitle>
              <CardDescription>
                Fill in your project details to generate a comprehensive README
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectName">Project Name *</Label>
                      <Input
                        id="projectName"
                        placeholder="My Awesome Project"
                        value={projectInfo.projectName}
                        onChange={(e) => handleInputChange('projectName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="version">Version</Label>
                      <Input
                        id="version"
                        placeholder="1.0.0"
                        value={projectInfo.version}
                        onChange={(e) => handleInputChange('version', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="A brief description of your project"
                      value={projectInfo.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        placeholder="Your Name"
                        value={projectInfo.author}
                        onChange={(e) => handleInputChange('author', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license">License</Label>
                      <Input
                        id="license"
                        placeholder="MIT"
                        value={projectInfo.license}
                        onChange={(e) => handleInputChange('license', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="repository">Repository URL</Label>
                    <Input
                      id="repository"
                      placeholder="https://github.com/username/repo"
                      value={projectInfo.repository}
                      onChange={(e) => handleInputChange('repository', e.target.value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="content" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="installation">Installation</Label>
                    <Textarea
                      id="installation"
                      placeholder="```bash
npm install my-project
```"
                      value={projectInfo.installation}
                      onChange={(e) => handleInputChange('installation', e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="usage">Usage</Label>
                    <Textarea
                      id="usage"
                      placeholder="```javascript
const myProject = require('my-project');
myProject.doSomething();
```"
                      value={projectInfo.usage}
                      onChange={(e) => handleInputChange('usage', e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contributing">Contributing</Label>
                    <Textarea
                      id="contributing"
                      placeholder="Pull requests are welcome. For major changes, please open an issue first..."
                      value={projectInfo.contributing}
                      onChange={(e) => handleInputChange('contributing', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tests">Tests</Label>
                    <Textarea
                      id="tests"
                      placeholder="```bash
npm test
```"
                      value={projectInfo.tests}
                      onChange={(e) => handleInputChange('tests', e.target.value)}
                      rows={3}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="homepage">Homepage</Label>
                    <Input
                      id="homepage"
                      placeholder="https://your-project-site.com"
                      value={projectInfo.homepage}
                      onChange={(e) => handleInputChange('homepage', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="acknowledgments">Acknowledgments</Label>
                    <Textarea
                      id="acknowledgments"
                      placeholder="Thanks to everyone who contributed to this project..."
                      value={projectInfo.acknowledgments}
                      onChange={(e) => handleInputChange('acknowledgments', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="badges"
                      checked={projectInfo.badges}
                      onChange={(e) => handleInputChange('badges', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="badges">Include GitHub badges</Label>
                  </div>
                </TabsContent>
              </Tabs>

              <Separator />

              <Button 
                onClick={generateReadme} 
                className="w-full"
                size="lg"
              >
                <Code className="mr-2 h-4 w-4" />
                Generate README
              </Button>
            </CardContent>
          </Card>

          {/* Output */}
          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Generated README
                  </CardTitle>
                  <CardDescription>
                    Your professional README file in Markdown format
                  </CardDescription>
                </div>
                {generatedReadme && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      className="flex items-center gap-1"
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadReadme}
                      className="flex items-center gap-1"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {generatedReadme ? (
                <div className="relative">
                  <Textarea
                    value={generatedReadme}
                    readOnly
                    className="min-h-[600px] font-mono text-sm"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary">Markdown</Badge>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[600px] text-slate-400">
                  <FileText className="h-16 w-16 mb-4" />
                  <p className="text-lg font-medium">No README generated yet</p>
                  <p className="text-sm mt-2">Fill in the form and click "Generate README"</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Generate professional READMEs instantly without any API calls
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold mb-2">Privacy First</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                All processing happens in your browser. Your data never leaves your device
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <Github className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2">GitHub Ready</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Follows GitHub's best practices and includes all essential sections
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}