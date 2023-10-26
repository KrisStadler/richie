import {Box, Container} from "@mui/material";
import RichTextEditor from "./components/RichTextEditor.tsx";

function App() {


  return (
      <Container maxWidth="md" sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
      }}>
          {/*Editor contianer ie: some external component that would contain the editor*/}
          <Box sx={{
              width: '800px',
              height: '700px',
              border: `1px solid #2F323720`,
                borderRadius: '4px',
          }}>
              <RichTextEditor />
          </Box>
      </Container>
  )
}

export default App
