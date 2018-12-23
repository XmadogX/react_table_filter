const propsValues = {
    head:["Number","Name","Theme","Exemple"],
    table:[
        ["№1","First","First Theme","Exemple first"],
        ["№2","Second","Second Theme","Exemple first"],
        ["№3","Three","test2","test2"],
        ["№4","Four","test3","test3"]
    ]
};
              
class Item extends React.Component {
    render() {
        return (
            this.props.rows.map(function(row){
                return <td>{row}</td>
            })
        );
    }
}
         
class SearchPlugin extends React.Component{
             
    constructor(props){
        super(props);
        this.onTextChanged = this.onTextChanged.bind(this);
    }
             
    onTextChanged(e){
        var text = e.target.value.trim();   // удаляем пробелы
        this.props.filter(text,this.props.number); // передаем введенный текст в родительский компонент
    }
             
    render() {
        return <input placeholder={`Search ${this.props.name}`} onChange={this.onTextChanged} />;
    }
}
                  
class ItemsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {table: this.props.data.table, head: this.props.data.head};

        this.filterList = this.filterList.bind(this);
    }
             
    filterList(text,number){
        var filteredList = this.props.data.table.filter(function(item){
            return item[number].toLowerCase().search(text.toLowerCase())!== -1;
        }); 
        this.setState({table: filteredList});
    }
              
    render() {
        return(
            <table>
                <thead>
                    <tr>
                        {
                            this.state.head.map((row)=>{
                                return (
                                    <th>{row}</th>
                                );
                            })
                        }
                    </tr>
                    <tr>
                        {
                            this.state.head.map((row, index)=>{
                                return (
                                    <th>
                                        <SearchPlugin filter={this.filterList} number= {index} name ={row}/>
                                    </th>
                                    );
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.table.map(function(rows){
                            return (
                                <tr>
                                    <Item key={rows} rows={rows} />
                                </tr>);
                        })
                    }
                </tbody>        
                
            </table>);
    }
}
          
ReactDOM.render(
    <ItemsList data={propsValues} />,
    document.getElementById("app")
)