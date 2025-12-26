import React, { useState } from "react";
import Papa from "papaparse";

function AboutPage() {
  const [results, setResults] = useState([]);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setFileName(file.name);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (parsed) => processData(parsed.data),
    });
  };

  const processData = (data) => {
    const playerData = {};
    data.forEach((row) => {
      const playerId = row["player_id"];
      const playerName = row["player_nickname"];
      const netValue = parseInt(row["net"]);
      if (!playerData[playerId]) {
        playerData[playerId] = { name: playerName, chips: 0 };
      }
      playerData[playerId].chips += netValue;
    });

    for (const playerId in playerData) {
      playerData[playerId].chips /= 200;
    }

    const creditors = [];
    const debtors = [];
    for (const playerId in playerData) {
      const balance = Math.round(playerData[playerId].chips);
      if (balance > 0) creditors.push({ id: playerId, name: playerData[playerId].name, amount: balance });
      else if (balance < 0) debtors.push({ id: playerId, name: playerData[playerId].name, amount: -balance });
    }

    creditors.sort((a, b) => b.amount - a.amount);
    debtors.sort((a, b) => b.amount - a.amount);

    const finalTab = [];
    debtors.forEach((debtor) => {
      let amountToPay = debtor.amount;
      const payments = [];
      creditors.forEach((creditor) => {
        if (amountToPay <= 0) return;
        if (creditor.amount <= 0) return;
        const payment = Math.min(amountToPay, creditor.amount);
        payments.push({ to: creditor.name, amount: payment });
        creditor.amount -= payment;
        amountToPay -= payment;
      });
      finalTab.push({ debtor: debtor.name, payments, remaining: amountToPay });
    });

    setResults(finalTab);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #581c87 50%, #1e293b 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)',
        backgroundSize: '40px 40px',
        opacity: 0.4
      }}></div>
      
      <div style={{
        position: 'relative',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '1.5rem 1.5rem'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '0.25rem',
            letterSpacing: '-0.025em'
          }}>
            Ledger Calculator
          </h1>
          <p style={{
            fontSize: '1rem',
            color: '#d8b4fe'
          }}>
            Simplify your payment settlements
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
          marginBottom: '1.5rem'
        }}>
          <label style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '8rem',
            border: '2px dashed rgba(216, 180, 254, 0.5)',
            borderRadius: '0.75rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                fontSize: '2rem',
                marginBottom: '0.5rem',
                color: '#d8b4fe'
              }}>
                ⬆️
              </div>
              <p style={{
                marginBottom: '0.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                color: 'white'
              }}>
                {fileName || "Click to upload CSV"}
              </p>
              <p style={{
                fontSize: '0.8rem',
                color: '#d8b4fe'
              }}>
                {fileName ? "File loaded successfully" : "Upload your ledger data"}
              </p>
            </div>
            <input 
              type="file" 
              accept=".csv" 
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        {results.length > 0 && (
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem'
            }}>
              <span style={{ fontSize: '1.25rem' }}>✓</span>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'white',
                margin: 0
              }}>
                Payment Instructions
              </h2>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {results.map((row, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.2)'}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      background: 'rgba(168, 85, 247, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem'
                    }}>
                      💰
                    </div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      color: 'white',
                      margin: 0
                    }}>
                      {row.debtor}
                    </h3>
                  </div>

                  <div style={{
                    marginLeft: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    {row.payments.map((p, i) => (
                      <div 
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '0.5rem',
                          padding: '0.75rem',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <span style={{
                            fontSize: '1rem',
                            color: '#d8b4fe'
                          }}>→</span>
                          <span style={{
                            fontSize: '1rem',
                            color: '#e9d5ff',
                            fontWeight: '500'
                          }}>
                            {p.to}
                          </span>
                        </div>
                        <span style={{
                          fontSize: '1.25rem',
                          fontWeight: 'bold',
                          color: '#4ade80'
                        }}>
                          ${p.amount}
                        </span>
                      </div>
                    ))}
                  </div>

                  {row.remaining > 0 && (
                    <div style={{
                      marginTop: '0.75rem',
                      marginLeft: '2.5rem',
                      background: 'rgba(234, 179, 8, 0.1)',
                      border: '1px solid rgba(234, 179, 8, 0.3)',
                      borderRadius: '0.5rem',
                      padding: '0.5rem'
                    }}>
                      <p style={{
                        color: '#fde047',
                        fontWeight: '500',
                        margin: 0,
                        fontSize: '0.9rem'
                      }}>
                        ⚠️ Remaining unpaid: ${row.remaining}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '2rem 0'
          }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              margin: '0 auto 1rem',
              borderRadius: '50%',
              background: 'rgba(168, 85, 247, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem'
            }}>
              📊
            </div>
            <p style={{
              fontSize: '1rem',
              color: '#e9d5ff'
            }}>
              Upload a CSV file to see payment settlements
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AboutPage;