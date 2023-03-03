import Vue from 'vue';
import {
    Button,
    Row,
    Col,
    Input,
    Spin,
    Radio,
    Select,
    FormModel,
    Table,
    Tabs,
    Popover,
    Tooltip,
    DatePicker,
    Pagination,
    Divider,
    Checkbox,
    Collapse,
    Menu,
    Dropdown,
    Icon,
    Modal,
    Empty,
    Cascader 
} from 'ant-design-vue';  

// 设置 table 的 size 默认值为 small
Table.props.size.default = 'small';
Vue.use(Spin);
Vue.use(Button);
Vue.use(Pagination);
Vue.use(Input);
Vue.use(Radio);
Vue.use(Select);
Vue.use(FormModel);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(Tabs);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(DatePicker);
Vue.use(Checkbox);
Vue.use(Divider);
Vue.use(Collapse);
Vue.use(Menu);
Vue.use(Dropdown);
Vue.use(Icon);
Vue.use(Modal);
Vue.use(Empty);
Vue.use(Cascader);
