import React, { useEffect } from 'react';
import MaterialTable, { Column } from 'material-table';
import { forwardRef } from 'react';
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
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


import Api from './Api';

const tableIcons = {
    Add: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref: React.Ref<SVGSVGElement>) => <ViewColumn {...props} ref={ref} />)
};


const localization = {
    pagination: {
        labelDisplayedRows: '{from}-{to} di {count}',
        labelRowsPerPage: 'righe per pagina',
        labelRowsSelect: 'righe',
        previousTooltip: 'Pagina precedente',
        nextTooltip: 'Pagina successiva',
        lastTooltip: 'Ultima pagina',
        fistTooltip: 'Prima pagina',
    },
    toolbar: {
        nRowsSelected: 'selezionate {0} righe',
        searchTooltip: 'Ricerca',
        searchPlaceholder: 'Cerca',

    },
    header: {
        actions: 'Azioni'
    },
    body: {
        addTooltip: 'Aggiunti',
        emptyDataSourceMessage: 'Nessun dato da visualizzare',
        filterRow: {
            filterTooltip: 'Filtra'
        },
        editRow : {
            deleteText : "Eliminare questa voce?"
        }
    }
}

interface Row {
    id: number;
    parent?: number;
    type: string;
    name: string
    content: string;
    ttl: number;
}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}

function Hosts() {

    const [hostsList, setHostsList] = React.useState<TableState>({
        columns: [
            { title: 'Tipo', field: 'type', initialEditValue: 'A', lookup: { 'A': 'IPv4', 'AAAA': 'IPv6', 'CNAME': 'Alias' } },
            { title: 'Nome', field: 'name' },
            { title: 'Contenuto', field: 'content' },
            { title: 'TTL', field: 'ttl', type: 'numeric', initialEditValue: 600 },
        ],
        data: [],
    });

    const getHostsList = () => {

        Api.call('GET', 'list')
            .then(returnedData => {
                setHostsList({
                    columns : hostsList.columns,
                    data: returnedData.data
                });
        }).catch((errorMessage: string) => {
            console.log(errorMessage);
        });
    }

    const addHost = (newData : Row ) => {
        return Api.call('POST', 'add', newData)
            .then(response => {
                if (!response.error) {
                    console.log("Host aggiunto");
                    setHostsList(prevState => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                    });
                }
            }).catch((msg: string) => {
            console.log(msg);
        });
    }

    const updateHost = (newData:Row, oldData:Row|undefined) => {
        return Api.call('POST', 'update', newData)
            .then(response => {
                if (!response.error) {
                    console.log("Host aggiornato");
                    if (oldData) {
                        setHostsList(prevState => {
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, data };
                        });
                    }
                }
            }).catch((msg: string) => {
            console.log(msg);
        });
    }

    const deleteHost = (oldData : Row) => {
        return Api.call('POST', 'delete', { 'id' : oldData.id })
            .then(response => {
                if (!response.error) {
                    console.log("Host eliminato");
                    setHostsList(prevState => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                    });
                }
            }).catch((msg: string) => {
            console.log(msg);
        });
    }

    useEffect(() => {
        getHostsList();
    },[]);

    // parentChildData={(row, rows) => rows.find(a => a.id === row.parent)}
    return (
        <MaterialTable
            title="Nomi di dominio"
            columns={hostsList.columns}
            data={hostsList.data}
            icons={tableIcons}
            localization={localization}
            options={{
                pageSize: 50,
                pageSizeOptions : [ 10, 20, 50, 100]
            }}
            editable={{
                onRowAdd: newData => addHost(newData),
                onRowUpdate: (newData, oldData) =>  updateHost(newData, oldData),
                onRowDelete: oldData => deleteHost(oldData),
            }}
        />
    );
}


export default Hosts;