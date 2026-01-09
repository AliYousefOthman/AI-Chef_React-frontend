import ReactMarkdown from "react-markdown";

export default function Section(props) {
    return (
        <section ref={props.ref} style={{marginLeft:"40px",marginBottom:"40px"}} aria-live="polite">
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    )
};