import React from 'react';
import PieChart from '../components/PieChart';
import IframeEmbed from '../components/IframeEmbed';

const Dashboard = () => {
    const chartData1 = {
        labels: ['TMS', 'Baru', 'Ubah', 'Difabel'],
        values: [7, 6, 49, 63],
        colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    };
    const chartData2 = {
        labels: ['Laki-Laki', 'Perempuan'],
        values: [2419, 2517,],
        colors: ['#36A2EB', '#FF6384'],
    };

    return (
        <>
            <h1>Dashboard</h1>
            <div className='row mt-5 justify-content-center'>
                <div className='col-md-5'>
                    <h2 className='text-center'>Data Perubahan DPT</h2>
                    <PieChart data={chartData1} />
                </div>
                <div className='col-md-5 mx-5'>
                    <h2 className='text-center'>Data Pemilih Aktif</h2>
                    <PieChart data={chartData2} />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
