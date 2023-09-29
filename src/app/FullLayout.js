
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import React from 'react'
import Dashboard from './dashboard/page'


const FullLayout = ({ children }) => {
    return (
        <div>
           <Dashboard/>
           <Header/>
           <Sidebar/>
        </div>
    )
}

export default FullLayout
