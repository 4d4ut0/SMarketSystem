import React, {Component, forwardRef} from "react";

import api from "../services/api"

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Print from '@material-ui/icons/Print';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import MaterialTable from "material-table";

export default class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos:[]
        };

        const lu = {
            "banana": "banana",
            "mango" : "manga",
            "grape":"uva",
            "tomato":"tomate",
            "onion":"cebola",
            "strawberry":"morango",
            "default":"outros"
        }

        this.columns =
            [
                { title: 'Fruta', field: 'name'},
                { title: 'Tipo', field: 'type', lookup: lu },
                { title: 'Preço', field: 'price' , type: 'numeric'},
                { title: 'Preço Max.', field: 'price_max' , type: 'numeric'},
                { title: 'Preço Min.', field: 'price_min' , type: 'numeric'},
                { title: 'Preço Padrão', field: 'price_default' , type: 'numeric'},
                { title: 'Unidade', field: 'unit' },
                { title: 'Imposto', field: 'taxation', type:'numeric'},
                { title: 'Vida de Prateleira', field: 'max_shelf_days' , type: 'numeric'},
                { title: 'Descrição', field: 'description' }
            ];

        this.state_model =
            {"barcode":"",
            "taxation":"",
            "max_shelf_days":"",
            "active":"",
            "_id":"",
            "name":"",
            "description":"",
            "price":"",
            "price_min":"",
            "price_max":"",
            "price_default":"",
            "unit":"",
            "type":"",
            "curves":
                [{"_id":"",
                    "shelf_days":"",
                    "buyability":""
                },{"_id":"",
                    "shelf_days":"","buyability":""
                },{"_id":"",
                    "shelf_days":"","buyability":""
                }]
            };

        this.data=[];

        this.tableIcons = {
            Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
            Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
            Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
            Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
            Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
            FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
            LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
            NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
            Print: forwardRef((props, ref) => <Print {...props} ref={ref} />),
            ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
            SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
            ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
            ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
        };
    }


    componentDidMount(){
        api.get("/products")
            .then(response => {
                console.log(response)
                this.setState({
                    todos: response.data
                })
            })
            .catch(error => {
                console.log("login error", error);
            });

    }


    render() {
        const { todos = [] } = this.state;
        return (
            <MaterialTable
                title="Produtos"
                columns={this.columns}
                data={todos}
                icons={this.tableIcons}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                const data = todos;
                                data.push(newData);
                                console.log("novo", newData);
                                api.post("/products/", newData)
                                    .then(response => {
                                       console.log(response)
                                    })
                                    .catch(error => {
                                        console.log("login error", error);
                                    });
                                this.setState({ data }, () => resolve());
                                resolve()
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    this.setState((prevState) => {
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
                                        return { ...prevState, data };
                                    });
                                }
                            }, 600);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                this.setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    return { ...prevState, data };
                                });
                            }, 600);
                        }),
                }}
            />
        );
    }
}
