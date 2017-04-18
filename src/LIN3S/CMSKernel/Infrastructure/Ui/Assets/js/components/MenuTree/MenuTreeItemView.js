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

import {React, ReactMotion} from './../../bundle.dependencies';
import {EditableLabel, WithOutsideClick, IconAdd, IconRemove, IconMove} from './../../bundle.components';
import {MenuTreeItemModel} from './../../bundle.model';

const
  Motion = ReactMotion.Motion,
  spring = ReactMotion.spring;

class MenuTreeItemView extends React.Component {

  static propTypes = {
    isSelected: React.PropTypes.bool,
    menuItemModel: React.PropTypes.instanceOf(MenuTreeItemModel).isRequired,
    onAddMenuItem: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onDrag: React.PropTypes.func,
    onDrop: React.PropTypes.func,
    onOutsideClick: React.PropTypes.func,
    onRemoveMenuItem: React.PropTypes.func,
    onUpdateMenuItem: React.PropTypes.func
  };

  static defaultProps = {
    isSelected: false,
    onAddMenuItem: () => {},
    onClick: () => {},
    onDrag: () => {},
    onDrop: () => {},
    onOutsideClick: () => {},
    onRemoveMenuItem: () => {},
    onUpdateMenuItem: () => {}
  };

  dragOriginalPosition = {x: 0, y: 0};

  constructor(props) {
    super(props);

    this.state = {
      isLabelEditing: false,
      isUrlEditing: false
    };

    // Pre bind methods' context
    this.boundOnAddMenuItemButtonClick = this.onAddMenuItemButtonClick.bind(this);
    this.boundOnRemoveMenuItemButtonClick = this.onRemoveMenuItemButtonClick.bind(this);

    this.boundOnMenuItemClick = this.onMenuItemClick.bind(this);
    this.boundOnMenuItemOutsideClick = this.onMenuItemOutsideClick.bind(this);

    this.boundOnEditableLabelClick = this.onEditableLabelClick.bind(this);
    this.boundOnEditableLabelOutsideClick = this.onEditableLabelOutsideClick.bind(this);
    this.boundOnEditableUrlClick = this.onEditableUrlClick.bind(this);
    this.boundOnEditableUrlOutsideClick = this.onEditableUrlOutsideClick.bind(this);
    this.boundOnEditableLabelChange = this.onEditableLabelChange.bind(this);
    this.boundOnEditableUrlChange = this.onEditableUrlChange.bind(this);

    // Drag/Drop
    this.boundOnDragHandleButtonClick = this.onDragHandleButtonClick.bind(this);
    this.boundOnDragHandleButtonMouseDown = this.onDragHandleButtonMouseDown.bind(this);
    this.boundOnMouseMove = this.onMouseMove.bind(this);
    this.boundOnMouseUp = this.onMouseUp.bind(this);
  }

  onAddMenuItemButtonClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const {onAddMenuItem, menuItemModel} = this.props;
    onAddMenuItem(menuItemModel.id);
  }

  onRemoveMenuItemButtonClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const {onRemoveMenuItem, menuItemModel} = this.props;
    onRemoveMenuItem(menuItemModel.id);
  }

  onDragHandleButtonClick(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragHandleButtonMouseDown(event) {
    const {menuItemModel, onOutsideClick, onDrag} = this.props;
    this.dragOriginalPosition = {
      x: event.pageX,
      y: event.pageY
    };
    this.toggleMouseMoveEventListener();
    onOutsideClick();
    onDrag(menuItemModel.id);
  }

  onMouseUp() {
    const {onDrop} = this.props;
    this.toggleMouseMoveEventListener(false);
    onDrop();
  }

  onMouseMove({pageX, pageY}) {
    const {menuItemModel, onDrag} = this.props;
    onDrag(menuItemModel.id, {
      x: pageX - this.dragOriginalPosition.x,
      y: pageY - this.dragOriginalPosition.y
    });
  }

  toggleMouseMoveEventListener(bind = true) {
    if (bind) {
      window.addEventListener('mousemove', this.boundOnMouseMove);
      window.addEventListener('mouseup', this.boundOnMouseUp);
    } else {
      window.removeEventListener('mousemove', this.boundOnMouseMove);
      window.removeEventListener('mouseup', this.boundOnMouseUp);
    }
  }

  onEditableLabelChange(newLabelValue) {
    const {onUpdateMenuItem, menuItemModel} = this.props;
    onUpdateMenuItem(menuItemModel.id, newLabelValue, menuItemModel.url);
  }

  onEditableUrlChange(newUrlValue) {
    const {onUpdateMenuItem, menuItemModel} = this.props;
    onUpdateMenuItem(menuItemModel.id, menuItemModel.label, newUrlValue);
  }

  onMenuItemClick() {
    const {onClick, menuItemModel} = this.props;
    onClick(menuItemModel.id);
  }

  onMenuItemOutsideClick() {
    const {onOutsideClick} = this.props;
    onOutsideClick();
  }

  onEditableLabelClick() {
    this.setState({
      isLabelEditing: true
    });
  }

  onEditableLabelOutsideClick() {
    this.setState({
      isLabelEditing: false
    });
  }

  onEditableUrlClick() {
    this.setState({
      isUrlEditing: true
    });
  }

  onEditableUrlOutsideClick() {
    this.setState({
      isUrlEditing: false
    });
  }

  getMenuItemUrlStyle() {
    const {isSelected} = this.props;
    const translateY = isSelected ? -5 : -49;
    return {
      translateY: spring(translateY)
    };
  }

  render() {
    const {menuItemModel} = this.props;
    const {isLabelEditing, isUrlEditing} = this.state;

    return <WithOutsideClick
      onItemClick={this.boundOnMenuItemClick}
      onOutsideClick={this.boundOnMenuItemOutsideClick}>
      <div className="menu-tree__item-wrapper">
        <div className="menu-tree__item">
          <EditableLabel
            cssClass="editable-label--label"
            isEditing={isLabelEditing}
            label="label"
            onChange={this.boundOnEditableLabelChange}
            onClick={this.boundOnEditableLabelClick}
            onOutsideClick={this.boundOnEditableLabelOutsideClick}
            value={menuItemModel.label}/>
          <Motion style={this.getMenuItemUrlStyle()}>
            {({translateY}) =>
              <div style={{
                transform: `translateY(${translateY}px)`
              }}>
                <EditableLabel
                  cssClass="editable-label--url"
                  isEditing={isUrlEditing}
                  label="url"
                  onChange={this.boundOnEditableUrlChange}
                  onClick={this.boundOnEditableUrlClick}
                  onOutsideClick={this.boundOnEditableUrlOutsideClick}
                  value={menuItemModel.url}/>
              </div>}
          </Motion>
        </div>
        <button
          className="menu-tree__item-option menu-tree__item-option--drag"
          onClick={this.boundOnDragHandleButtonClick}
          onMouseDown={this.boundOnDragHandleButtonMouseDown}>
          <IconMove/>
        </button>
        <button
          className="menu-tree__item-option menu-tree__item-option--add"
          onClick={this.boundOnAddMenuItemButtonClick}>
          <IconAdd/>
        </button>
        <button
          className="menu-tree__item-option menu-tree__item-option--remove"
          onClick={this.boundOnRemoveMenuItemButtonClick}>
          <IconRemove/>
        </button>
      </div>
    </WithOutsideClick>
  }
}

export default MenuTreeItemView;
