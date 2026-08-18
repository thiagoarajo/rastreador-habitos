# 🔥 Rastreador de Hábitos

App web simples para acompanhar hábitos diários, com contagem de sequência (streak) e um calendário visual dos últimos 60 dias.

## Funcionalidades

- Adicionar novos hábitos
- Marcar/desmarcar o hábito como feito no dia
- Sequência de dias consecutivos (🔥 streak)
- Calendário dos últimos 60 dias mostrando os dias concluídos
- Excluir hábitos
- Dados salvos localmente no navegador (`localStorage`), sem backend

## Como rodar

O projeto é HTML/CSS/JS puro, sem dependências ou build.

**Opção 1 — servidor incluso (Windows/PowerShell):**

```powershell
./serve.ps1
```

Depois acesse [http://localhost:8080](http://localhost:8080).

**Opção 2 — abrir direto no navegador:**

Basta abrir o arquivo `index.html` diretamente no navegador.

## Estrutura

| Arquivo      | Descrição                                  |
| ------------ | ------------------------------------------- |
| `index.html` | Estrutura da página                         |
| `style.css`  | Estilos                                     |
| `script.js`  | Lógica de hábitos, streaks e persistência   |
| `serve.ps1`  | Servidor HTTP local simples para desenvolvimento |
