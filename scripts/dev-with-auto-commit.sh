#!/bin/bash

# DM3 Development with Auto-Commit Agent
# Starts the React dev server and optionally the auto-commit agent

echo "🚀 Starting DM3 Development Environment"
echo "=====================================\n"

# Check if auto-commit is requested
AUTO_COMMIT=${1:-""}

if [ "$AUTO_COMMIT" = "--auto-commit" ] || [ "$AUTO_COMMIT" = "-a" ]; then
    echo "🤖 Auto-commit agent will be started alongside dev server"
    echo "   - Watching for major updates every 2 minutes"
    echo "   - Intelligent commit messages generated automatically"
    echo "   - Changes pushed to GitHub automatically"
    echo "   - Logs saved to auto-commit.log"
    echo ""
    
    # Start auto-commit agent in background
    npm run auto-commit:watch &
    AUTO_COMMIT_PID=$!
    echo "🤖 Auto-commit agent started (PID: $AUTO_COMMIT_PID)"
else
    echo "💡 Tip: Add --auto-commit flag to enable automatic GitHub commits"
    echo "   Example: ./scripts/dev-with-auto-commit.sh --auto-commit"
    echo ""
fi

echo "🌐 Starting React development server..."
echo ""

# Function to handle cleanup on exit
cleanup() {
    echo "\n🛑 Shutting down development environment..."
    
    if [ ! -z "$AUTO_COMMIT_PID" ]; then
        echo "🤖 Stopping auto-commit agent..."
        kill $AUTO_COMMIT_PID 2>/dev/null
    fi
    
    echo "✅ Cleanup complete"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start the React development server
npm start

# If we reach here, npm start exited
cleanup