import Skeleton from '@mui/material/Skeleton';
type IToDoSkeleton = {
    num:number;
    width?:number;
    height?:number;
}
const ToDoSkeleton = (props:IToDoSkeleton) => {
    const {num, height, width} = props
    return(
        <>
        {[...Array(num)].map((e,i)=> {
            return <Skeleton width={width} height={height} key={Math.random()+i}></Skeleton>
        })}
        </>
    );
}
export default ToDoSkeleton;