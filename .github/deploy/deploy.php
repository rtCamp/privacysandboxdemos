<?php

namespace Deployer;

// adds common necessities for the deployment.
require 'recipe/common.php';

set( 'ssh_type', 'native' );
set( 'ssh_multiplexing', true );

if ( file_exists( 'vendor/deployer/recipes/recipe/rsync.php' ) ) {
	require 'vendor/deployer/recipes/recipe/rsync.php';
} else {
	require getenv( 'COMPOSER_HOME' ) . '/vendor/deployer/recipes/recipe/rsync.php';
}

inventory( '/hosts.yml' );

$deployer = Deployer::get();
$hosts    = $deployer->hosts;

foreach ( $hosts as $host ) {
	$host
		->addSshOption( 'UserKnownHostsFile', '/dev/null' )
		->addSshOption( 'StrictHostKeyChecking', 'no' );

	$deployer->hosts->set( $host->getHostname(), $host );
}

// Add tests and other directory unnecessary things for
// production to exclude block.
set( 'rsync', [
	'exclude'       => [
		'.git',
		'.github',
		'deploy.php',
		'composer.lock',
		'.env',
		'.env.example',
		'.gitignore',
		'.gitlab-ci.yml',
		'Gruntfile.js',
		'package.json',
		'gulpfile.js',
		'.circleci',
		'package-lock.json',
		'package.json',
		'phpcs.xml',
	],
	'exclude-file'  => true,
	'include'       => [],
	'include-file'  => false,
	'filter'        => [],
	'filter-file'   => false,
	'filter-perdir' => false,
	'flags'         => 'rz', // Recursive, with compress
	'options'       => [ 'delete', 'delete-excluded', 'links', 'no-perms', 'no-owner', 'no-group' ],
	'timeout'       => 300,
] );

set( 'rsync_src', getenv( 'build_root' ) );
set( 'rsync_dest', '{{release_path}}' );

$tasks = [
	'deploy:prepare',
	'deploy:unlock',
	'deploy:lock',
	'deploy:release',
	'rsync',
	'deploy:shared',
	'deploy:symlink',
	'deploy:unlock',
	'cleanup',
];

$addon_recipe = getenv( 'GITHUB_WORKSPACE' ) . '/.github/deploy/addon.php';
if ( file_exists( $addon_recipe ) ) {
	require $addon_recipe;
}

/*   deployment task   */
desc( 'Deploy the project' );
task( 'deploy', $tasks );
after( 'deploy', 'success' );
