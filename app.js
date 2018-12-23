"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propsValues = {
    head: ["Number", "Name", "Theme", "Exemple"],
    table: [["№1", "First", "First Theme", "Exemple first"], ["№2", "Second", "Second Theme", "Exemple first"], ["№3", "Three", "test2", "test2"], ["№4", "Four", "test3", "test3"]]
};

var Item = function (_React$Component) {
    _inherits(Item, _React$Component);

    function Item() {
        _classCallCheck(this, Item);

        return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
    }

    _createClass(Item, [{
        key: "render",
        value: function render() {
            return this.props.rows.map(function (row) {
                return React.createElement(
                    "td",
                    null,
                    row
                );
            });
        }
    }]);

    return Item;
}(React.Component);

var SearchPlugin = function (_React$Component2) {
    _inherits(SearchPlugin, _React$Component2);

    function SearchPlugin(props) {
        _classCallCheck(this, SearchPlugin);

        var _this2 = _possibleConstructorReturn(this, (SearchPlugin.__proto__ || Object.getPrototypeOf(SearchPlugin)).call(this, props));

        _this2.onTextChanged = _this2.onTextChanged.bind(_this2);
        return _this2;
    }

    _createClass(SearchPlugin, [{
        key: "onTextChanged",
        value: function onTextChanged(e) {
            var text = e.target.value.trim(); // удаляем пробелы
            this.props.filter(text, this.props.number); // передаем введенный текст в родительский компонент
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("input", { placeholder: "Search " + this.props.name, onChange: this.onTextChanged });
        }
    }]);

    return SearchPlugin;
}(React.Component);

var ItemsList = function (_React$Component3) {
    _inherits(ItemsList, _React$Component3);

    function ItemsList(props) {
        _classCallCheck(this, ItemsList);

        var _this3 = _possibleConstructorReturn(this, (ItemsList.__proto__ || Object.getPrototypeOf(ItemsList)).call(this, props));

        _this3.state = { table: _this3.props.data.table, head: _this3.props.data.head };

        _this3.filterList = _this3.filterList.bind(_this3);
        return _this3;
    }

    _createClass(ItemsList, [{
        key: "filterList",
        value: function filterList(text, number) {
            var filteredList = this.props.data.table.filter(function (item) {
                return item[number].toLowerCase().search(text.toLowerCase()) !== -1;
            });
            this.setState({ table: filteredList });
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            return React.createElement(
                "table",
                null,
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        this.state.head.map(function (row) {
                            return React.createElement(
                                "th",
                                null,
                                row
                            );
                        })
                    ),
                    React.createElement(
                        "tr",
                        null,
                        this.state.head.map(function (row, index) {
                            return React.createElement(
                                "th",
                                null,
                                React.createElement(SearchPlugin, { filter: _this4.filterList, number: index, name: row })
                            );
                        })
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    this.state.table.map(function (rows) {
                        return React.createElement(
                            "tr",
                            null,
                            React.createElement(Item, { key: rows, rows: rows })
                        );
                    })
                )
            );
        }
    }]);

    return ItemsList;
}(React.Component);

ReactDOM.render(React.createElement(ItemsList, { data: propsValues }), document.getElementById("app"));
