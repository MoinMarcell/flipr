import NewFliprForm from "./NewFliprForm";

type NewFliprProps = {
    onSaveFlipr: (content:string) => void
}

const NewFlipr = (props: NewFliprProps) => {
    const saveFliprHandler = (content: string) => {
        props.onSaveFlipr(content);
    }
    return (
        <div>
            <NewFliprForm onSaveFlipr={saveFliprHandler} />
        </div>
    );
}

export default NewFlipr;
