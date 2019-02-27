'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the scrumtrulescent ${chalk.red(
          'generator-rake-task'
        )} generator!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'project_name',
        message: 'Your project_name?',
        default: yoHelper.discoverRoot
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your project description?'
      }
    ];

    return this.prompt(prompts).then((props) => {
      this.props = props;
    });
  }

  writing() {
    this._writingTplFiles();
  }

  _writingTplFiles() {
    this.fs.copyTpl(
      this.templatePath('{.*,*}'),
      this.destinationPath('.'),
      this.props
    );
  }
  install() {
    console.log('Enjoy coding. :)');
  }
};
