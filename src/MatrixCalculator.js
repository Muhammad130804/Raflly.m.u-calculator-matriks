import React, { useState } from 'react';

function MatrixInput({ label, onChange }) {
  const handleChange = (row, col, value) => {
    const updatedMatrix = Array.from({ length: 2 }, (_, i) =>
      Array.from({ length: 2 }, (_, j) =>
        (i === row && j === col) ? parseFloat(value) || 0 : onChange[i][j]
      )
    );
    onChange(updatedMatrix);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3 style={{ color: '#4CAF50', marginBottom: '10px' }}>{label}</h3>
      {Array.from({ length: 2 }).map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center' }}>
          {Array.from({ length: 2 }).map((_, colIndex) => (
            <input
              key={colIndex}
              type="number"
              style={{ width: '60px', height: '40px', margin: '2px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '5px' }}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}


function MatrixCalculator() {
  const [matrixA, setMatrixA] = useState(Array.from({ length: 2 }, () => Array(2).fill(0)));
  const [matrixB, setMatrixB] = useState(Array.from({ length: 2 }, () => Array(2).fill(0)));
  const [result, setResult] = useState(null);

  const handleOperation = (operation) => {
    try {
      let res;
      const matA = matrixA;
      const matB = matrixB;

      if (operation === 'add') {
        res = matA.map((row, i) => row.map((val, j) => val + matB[i][j]));
      } else if (operation === 'subtract') {
        res = matA.map((row, i) => row.map((val, j) => val - matB[i][j]));
      } else if (operation === 'multiply') {
        res = Array.from({ length: 2 }, (_, i) =>
          Array.from({ length: 2 }, (_, j) =>
            matA[i].reduce((sum, _, k) => sum + matA[i][k] * matB[k][j], 0)
          )
        );
      } else {
        throw new Error('Unsupported operation');
      }

      setResult(res);
    } catch (error) {
      alert('Error performing operation: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ color: '#333', marginBottom: '30px' }}>Kalkulator Matriks Raflly.m.ubaidillah</h1>

      <MatrixInput label="Matrix A" onChange={setMatrixA} />
      <MatrixInput label="Matrix B" onChange={setMatrixB} />

      <div style={{ margin: '20px 0' }}>
        <button onClick={() => handleOperation('add')} style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', marginRight: '10px', cursor: 'pointer' }}>Tambah</button>
        <button onClick={() => handleOperation('subtract')} style={{ backgroundColor: '#FF9800', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', marginRight: '10px', cursor: 'pointer' }}>Kurangi</button>
        <button onClick={() => handleOperation('multiply')} style={{ backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}>Kalikan</button>
      </div>

      {result && (
        <div>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>Hasil:</h3>
          {result.map((row, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
              {row.map((value, j) => (
                <div key={j} style={{ width: '60px', height: '40px', margin: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f1f1', border: '1px solid #ccc', borderRadius: '5px' }}>{value}</div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MatrixCalculator;
