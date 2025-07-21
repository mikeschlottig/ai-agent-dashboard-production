import React from 'react'
import { Bot, MessageSquare, BookOpen, BarChart3 } from 'lucide-react'

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to your AI Dashboard
        </h1>
        <p className="text-gray-600">
          Manage and interact with 200+ AI models from multiple providers
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bot className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">AI Models</p>
              <p className="text-2xl font-semibold text-gray-900">200+</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Chats</p>
              <p className="text-2xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Documents</p>
              <p className="text-2xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Cost</p>
              <p className="text-2xl font-semibold text-gray-900">$0.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Getting started */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Getting Started
        </h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-900">
                Add your API keys
              </h3>
              <p className="text-sm text-gray-600">
                Go to Settings and add API keys for OpenAI, Anthropic, Google AI, or OpenRouter to start using AI models.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-900">
                Start your first chat
              </h3>
              <p className="text-sm text-gray-600">
                Navigate to the Chat section and select an AI model to begin your conversation.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              3
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-900">
                Upload knowledge documents
              </h3>
              <p className="text-sm text-gray-600">
                Use the Knowledge Base to upload documents and enhance your AI interactions with relevant context.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}