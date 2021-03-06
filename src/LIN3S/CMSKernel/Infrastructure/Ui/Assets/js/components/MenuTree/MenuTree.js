/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2017-2018 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Mikel Tuesta <mikeltuesta@gmail.com>
 */

import {React} from './../../bundle.dependencies';
import {MenuTreeItemModel} from './../../bundle.model';
import {setFormInputValue, getFormInputValue} from './../../bundle.util';

import MenuTreeView from './MenuTreeView';

class MenuTree extends React.Component {

  static propTypes = {
    formInput: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      menuTree: this.getInitialMenuTree()
    };

    // Pre bind methods' context
    this.boundOnAddMenuItemButtonClick = this.onAddMenuItemButtonClick.bind(this);

    this.boundAddMenuItem = this.addMenuItem.bind(this);
    this.boundRemoveMenuItem = this.removeMenuItem.bind(this);
    this.boundUpdateMenuItem = this.updateMenuItem.bind(this);

    this.boundMoveMenuItem = this.moveMenuItem.bind(this);
  }

  getInitialMenuTree() {
    const {formInput} = this.props;
    const menuTreeJson = getFormInputValue(formInput);

    if (menuTreeJson === '') {
      return new MenuTreeItemModel([], '', '', MenuTreeItemModel.MENU_TREE_ROOT_ID);
    }

    return MenuTreeItemModel.fromJson(menuTreeJson);
  }

  persistChanges(menuTree) {
    const {formInput} = this.props;
    setFormInputValue(formInput, JSON.stringify(menuTree.children.map(menuItem => menuItem)));

    this.setState({
      menuTree: menuTree
    });
  }

  onAddMenuItemButtonClick(event) {
    event.preventDefault();

    const {menuTree} = this.state;
    const newMenuTree = MenuTreeItemModel.addChild(menuTree, MenuTreeItemModel.MENU_TREE_ROOT_ID, new MenuTreeItemModel());
    this.persistChanges(newMenuTree);
  }

  addMenuItem(menuItemId) {
    const {menuTree} = this.state;
    const newMenuTree = MenuTreeItemModel.addChild(menuTree, menuItemId, new MenuTreeItemModel());
    this.persistChanges(newMenuTree);
  }

  removeMenuItem(menuItemId) {
    const {menuTree} = this.state;
    const newMenuTree = MenuTreeItemModel.removeChild(menuTree, menuItemId);
    this.persistChanges(newMenuTree);
  }

  updateMenuItem(menuItemId, label, url) {
    const {menuTree} = this.state;
    const newMenuTree = MenuTreeItemModel.updateChild(menuTree, menuItemId, label, url);
    this.persistChanges(newMenuTree);
  }

  moveMenuItem(menuItemId, toMenuItemId, index) {
    const {menuTree} = this.state;
    const newMenuTree = MenuTreeItemModel.moveChild(menuTree, menuItemId, toMenuItemId, index);
    this.persistChanges(newMenuTree);
  }

  render() {
    const {menuTree} = this.state;

    return <div className="menu-tree">
      <MenuTreeView
        menuTree={menuTree}
        onAddMenuItem={this.boundAddMenuItem}
        onMoveMenuItem={this.boundMoveMenuItem}
        onRemoveMenuItem={this.boundRemoveMenuItem}
        onUpdateMenuItem={this.boundUpdateMenuItem}/>
      <button
        className="button button--cms"
        onClick={this.boundOnAddMenuItemButtonClick}>
        Add menu item
      </button>
    </div>;
  }
}

export default MenuTree;
