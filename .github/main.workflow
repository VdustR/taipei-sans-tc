workflow "GitHub Page" {
  on = "push"
  resolves = ["Deploy to GitHub Pages"]
}

action "Master Branch Only" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Install" {
  uses = "nuxt/actions-yarn@master"
  args = "install"
}

action "Build" {
  uses = "nuxt/actions-yarn@master"
  args = "doc:build"
  needs = ["Install"]
  env = {
    PUBLIC_URL = "/taipei-sans-tc/"
  }
}

action "Deploy to GitHub Pages" {
  uses = "maxheld83/ghpages@v0.2.1"
  env = {
    BUILD_DIR = "packages/doc/dist/"
  }
  needs = ["Master Branch Only", "Build"]
  secrets = ["GH_PAT"]
}
