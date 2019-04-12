'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const glob = require('glob');
const { resolve } = require('path');
const remote = require('yeoman-remote');
const yoHelper = require('yeoman-generator-helper');
const replace = require('replace-in-file');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the stunning ${chalk.red(
          'generator-rake'
        )} generator!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'project_name',
        message: 'Your project_name (eg: like this `react-button` )?',
        default: yoHelper.discoverRoot
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your description?'
      },
      {
        type: 'input',
        name: 'namespace',
        message: 'Your namespace?'
      }
    ];

    return this.prompt(prompts).then(
      function(props) {
        // To access props later use this.props.someAnswer;
        this.props = props;
        yoHelper.rewriteProps(props);
      }.bind(this)
    );
  }

  writing() {
    const done = this.async();
    remote(
      'afeiship',
      'boilerplate-rake',
      function(err, cachePath) {
        // copy files:
        this.fs.copy(
          glob.sync(resolve(cachePath, '{**,.*}')),
          this.destinationPath()
        );
        done();
      }.bind(this)
    );
  }

  end() {
    const { project_name, description, namespace } = this.props;
    const files = glob.sync(resolve(this.destinationPath(), '{**,.*}'));

    console.log('files:', files)

    replace.sync({
      files,
      from: [
        /boilerplate-rake-description/g,
        /boilerplate_rake_namespace/g,
        /boilerplate-rake/g,
      ],
      to: [description, namespace, project_name]
    });
  }
};
