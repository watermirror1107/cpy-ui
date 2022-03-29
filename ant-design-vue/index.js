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
    Pagination
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
