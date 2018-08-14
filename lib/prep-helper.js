'use babel';

import PrepHelperView from './prep-helper-view';
import { CompositeDisposable } from 'atom';
const uuidv4 = require('uuid/v4');

export default {

  prepHelperView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.prepHelperView = new PrepHelperView(state.prepHelperViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.prepHelperView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'prep-helper:uuid': () => this.uuid(),
      'prep-helper:liveCode': () => this.liveCode(),
      'prep-helper:multipleChoiceQuestion': () => this.multipleChoiceQuestion(),
      'prep-helper:testlessCodingQuestion': () => this.testlessCodingQuestion(),
      'prep-helper:codingQuestion': () => this.codingQuestion(),
      'prep-helper:categorizationQuestion': () => this.categorizationQuestion(),
      'prep-helper:fillInTheBlankQuestion': () => this.fillInTheBlankQuestion()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.prepHelperView.destroy();
  },

  serialize() {
    return {
      prepHelperViewState: this.prepHelperView.serialize()
    };
  },

  uuid() {
    let editor;

    if (editor = atom.workspace.getActiveTextEditor()) {
      editor.insertText(uuidv4());
    }
  },

  liveCode() {
    let editor;

    if (editor = atom.workspace.getActiveTextEditor()) {
      const id = uuidv4();
      editor.insertText(`type: live-code\nid: ${id}\ncode: |\n  `);
    }
  },

  multipleChoiceQuestion() {
    let editor;

    if (editor = atom.workspace.getActiveTextEditor()) {
      const id = uuidv4();
      editor.insertText(`type: multiple-choice-question\nid: ${id}\nquestion: |\n  \noptions:\n  \n`);
      editor.moveUp(3);
      editor.moveRight(2);
    }
  },

  testlessCodingQuestion() {
    let editor;

    if (editor = atom.workspace.getActiveTextEditor()) {
      const id = uuidv4();
      editor.insertText(`type: testless-coding-question\nid: ${id}\nquestion: |\n  \ncode: |\n  \n`);
      editor.moveUp(3);
      editor.moveRight(2);
    }
  },

  codingQuestion() {
    let editor;

    if (editor = atom.workspace.getActiveTextEditor()) {
      const id = uuidv4();
      editor.insertText(`type: coding-question\nid: ${id}\nquestion: |\n  \ncode: |\n  \ntests: |\n  \n`);
      editor.moveUp(5);
      editor.moveRight(2);
    }
  },

  fillInTheBlankQuestion() {
    let editor;

    if (editor = atom.workspace.getActiveTextEditor()) {
      const id = uuidv4();
      editor.insertText(`type: fill-in-the-blank-question\nid: ${id}\nquestion: |\n  \nblanks:\n  \n`);
      editor.moveUp(3);
      editor.moveRight(2);
    }
  },

  categorizationQuestion() {
    let editor;

    if (editor = atom.workspace.getActiveTextEditor()) {
      const id = uuidv4();
      editor.insertText(`type: categorization-question\nid: ${id}\nquestion: |\n  \ncategories: []\nmappings:\n  \n`);
      editor.moveUp(4);
      editor.moveRight(2);
    }
  },

};
