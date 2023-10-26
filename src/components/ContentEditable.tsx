import { ContentEditable } from '@lexical/react/LexicalContentEditable'

interface Props {
    className: string
}
const EditorContentEditable = ({ className }: Props): JSX.Element => (
    <ContentEditable className={className} />
)

export default EditorContentEditable