#!/usr/bin/env bash

function setup_files() {

	cd "$GITHUB_WORKSPACE/demo"
	export build_root="$(pwd)"
	rsync -a simple/ .
}

function main() {
	setup_hosts_file
	check_branch_in_hosts_file
	setup_ssh_access
	maybe_install_node_dep
	maybe_run_node_build
	maybe_install_submodules
	setup_files
	deploy
}

main
