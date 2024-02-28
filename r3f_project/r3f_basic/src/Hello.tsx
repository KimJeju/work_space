interface propsType{
    to:string
    from:string
}

export function Hello(props:propsType){
    const {to, from} = props;
    return(
        <>
            <div>hello {to} from : {from}</div>
        </>
    )
}
