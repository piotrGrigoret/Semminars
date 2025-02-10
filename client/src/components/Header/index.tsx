import { Container } from '@mui/material'
import logoWhite from '/png/logo_white.png'
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
export const Header = () => {
  return (
    <Container  sx={{
        display: 'flex',        
        justifyContent: 'center', 
        alignItems: 'center',
      }}>
        <Link to={'/'}><img className={styles.mainImage} src={logoWhite} alt="" /></Link>
    </Container>
  )
}
