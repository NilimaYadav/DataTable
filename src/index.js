import React from "react";
import { render } from "react-dom";
import { makeData} from "./Utils";
import matchSorter from 'match-sorter'
import { CSVLink, CSVDownload } from "react-csv";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
// pure component
const AllUpperCase = props => <span>{props.value.toUpperCase()}</span>;


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData(10),
      filtered: [],
      filterAll: '',
    };
    this.filterAll = this.filterAll.bind(this);
  }

  onFilteredChange(filtered) {
    // console.log('filtered:',filtered);
    // const { sortedData } = this.reactTable.getResolvedState();
    // console.log('sortedData:', sortedData);

    // extra check for the "filterAll"
    if (filtered.length > 1 && this.state.filterAll.length) {
      // NOTE: this removes any FILTER ALL filter
      const filterAll = '';
      this.setState({ filtered: filtered.filter((item) => item.id != 'all'), filterAll })
    }
    else
      this.setState({ filtered });
  }

  filterAll(e) {
    const { value } = e.target;
    const filterAll = value;
    const filtered = [{ id: 'all', value: filterAll }];
    // NOTE: this completely clears any COLUMN filters
    this.setState({ filterAll, filtered });
  }

  render() {
    const { data } = this.state;
     var csvData = this.state.data;
    return (
      <div>
      <div className="topheader"> <p className="title">DataTable</p> </div>
      <div className="container-fluid">
      <div className="paratitle">
        <p className="datacontnet">
          DataTables
        </p>
        <p className="datacontnetone">
          advanced features to any HTML table
        </p>

      </div>
      <div className="col-sm-12 col-md-8 col-lg-8 col-md-offset-2 col-lg-offset-2">
        <div className="row mainbody">
          <div className="row tablerow">
          <div className="col-sm-4 col-md-3 col-lg-3">
           <div>
            <input  value={this.state.filterAll} onChange={this.filterAll} className="form-control" placeholder="Search"/> 
            <span className="glyphicon glyphicon-search form-control-feedback"></span>
            </div>
           </div>
           <div className="col-sm-4 col-md-7 col-lg-7"></div>
           <div className="col-sm-4  col-md-2 col-lg-2">
           <CSVLink
          data={this.state.data}
          className="btn btn-info">
          Export to .CSV
        </CSVLink>
           </div>
          </div>
          <div className="row tablerow">
          <ReactTable
          getTrProps={(state,rowInfo)=>{
          }}
          filtered={this.state.filtered}
          ref={r => this.reactTable = r}
          onFilteredChange={this.onFilteredChange.bind(this)}
          data={data}
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          columns={[
            {
              columns: [
                {
                  Header: "Item1",
                  accessor: "Item1",
                  filterMethod: (filter, row) => {
                    return row[filter.id].includes(filter.value);
                  }
                },
                {
                  Header: "Item2", 
                  accessor: "Item2",
                  filterMethod: (filter, row) => {
                    return row[filter.id].includes(filter.value);
                  }
                }
              ]
            },
            {
              columns: [
                {
                  Header: "Invoice_number",
                  accessor: "Invoice_number"
                },
                {
                  Header: "Item3",
                  accessor: "Item3",
                  filterMethod: (filter, row) => {
                    return row[filter.id].includes(filter.value);
                  }
                },
                {
                  Header: "Reg_Id",
                  accessor: "Reg_Id",
                  filterMethod: (filter, row) => {
                    return row[filter.id].includes(filter.value);
                  }
                },
              ]
            },
            {
              Header: "",
              id: 'all',
              class : 'allclass',
              width: -0,
              resizable: false,
              sortable: false,
              Filter: () => { },
              getProps: () => {
                return {
                }
              },
              filterMethod: (filter, rows) => {
                const result = matchSorter(rows, filter.value, {
                  keys: [
                    "Item1",
                    "Item2",
                    "Invoice_number",
                    "Item3",
                    "Reg_Id"
                  ], threshold: matchSorter.rankings.WORD_STARTS_WITH
                });
                console.log('row[0]:', result[0]);
                return result;
              },
              filterAll: true,
            },

          ]}
          defaultPageSize={10}
          className="table"

          getTrProps={(state,rowInfo)=>{ 
            return {} 
          }}
        />
          </div>
        </div>
      </div>    
      </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
