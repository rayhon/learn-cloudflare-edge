```bash
# 1. Start with main branch
git checkout main

# 2. When you finish lesson 1 milestone:
git checkout -b "lesson 1"
git add .
git commit -m "Lesson 1: Initial project setup with Cloudflare Pages"
git push origin "lesson 1"

# 3. Go back to main to continue development and repeat
git checkout main

# To rollback to a previous lesson:
git stash
git checkout "lesson 2"
git checkout -b "new-direction-from-lesson-2"

```

## Useful commands

```bash
# List all branches (* shows current branch)
git branch
# See branch history
git log --oneline --graph --all
# See differences between lessons
git diff "lesson 1" "lesson 2"

```