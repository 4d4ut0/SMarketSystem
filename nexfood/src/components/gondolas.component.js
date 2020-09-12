import React, {Component, forwardRef, useEffect} from "react";

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

export default class Gondolas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos:[],
            _products:{},
            _tags:{}
        };

        this.columns =
            [
                { title: 'Nome', field: 'name' },
                { title: 'Produto', field:'product'},
                { title: 'Etiqueta', field:'tag'}
            ];

        this.state_model =
            {
                "posx":"",
                "posy":"",
                "height":"",
                "width":"",
                "scalex":"",
                "scaley":"",
                "angle":"",
                "active":"",
                "_id":"",
                "name":"",
                "createdAt":"",
                "product":"",
                "tag":""
            }

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

        // useEffect(() => {   
        //     try{
        //         ( async () => {
        //             const products = await api.get("/products");

        //             this.setState({
        //                 _products: products.data.forEach(product => {
        //                     let newProduct = {"oi":"cara de boi"}
        //                     // newProduct[`${product._id}`] = product.name
        //                     console.log(newProduct)
        //                     return newProduct;
        //                 })
        //             })
        //         })()
                
        //     }catch(err){
        //         console.err(err)
        //     }
        // }, []);
    }

    async componentDidMount(){
        try{
            const gondolas = await api.get("/gondolas");

            const tags = await api.get("/tags");

            this.setState({
                todos: gondolas.data.map(gondola => {
                    return {
                        name: gondola.name,
                        product: gondola.product ? gondola.product.name: "Select",
                        tag: gondola.tag ? gondola.tag.name: "Select"
                    }
                }),

                _tags: tags.data.map(tag => {
                    return {
                        id: tag.id,
                        name: tag.name
                    }
                })
            })
        }catch(err){
            console.err(err)
        }
    }

    render() {
        const { todos = [] } = this.state;
        return (
            <MaterialTable
                title="Gôndolas"
                columns={this.columns}
                data={todos}
                icons={this.tableIcons}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                const data = todos;
                                data.push(newData);
                                console.log(newData);
                                api.post("/gondolas/", newData)
                                    .then(response => {
                                        console.log(response)
                                    })
                                    .catch(error => {
                                        console.log("login error", error);
                                    });
                                this.setState({ data }, () => resolve());
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
