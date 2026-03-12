<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>Elo | Mobile</title>
    <style>
        :root {
            --primary: #ff4b6b;
            --gradient: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
            --bg: #ffffff;
        }

        /* Prevent scrolling & Zooming */
        html, body {
            height: 100%;
            width: 100%;
            overflow: hidden;
            background: #000;
            position: fixed;
        }

        * { 
            box-sizing: border-box; 
            margin: 0; 
            padding: 0; 
            font-family: -apple-system, system-ui, sans-serif;
            -webkit-tap-highlight-color: transparent;
        }
        
        .app-shell { 
            width: 100%; 
            height: 100dvh; 
            background: var(--bg); 
            display: flex; 
            flex-direction: column;
            /* FIX: Pushes content away from Notch and Home Bar */
            padding-top: env(safe-area-inset-top);
            padding-bottom: env(safe-area-inset-bottom);
        }

        .header { 
            padding: 15px 20px; 
            font-size: 24px; 
            font-weight: 900; 
            color: var(--primary); 
            border-bottom: 1px solid #eee;
            flex-shrink: 0;
        }

        .view { flex: 1; display: none; flex-direction: column; overflow: hidden; }
        .view.active { display: flex; }

        .stack-area { flex: 1; position: relative; margin: 10px; }
        #card-stack { width: 100%; height: 100%; position: relative; }
        
        .card { 
            position: absolute; inset: 0; border-radius: 20px; 
            overflow: hidden; background: #f0f0f0; 
            box-shadow: 0 4px 10px rgba(0,0,0,0.1); 
        }
        
        /* FIX: Ensures image fills the card and handles errors */
        .card img { 
            width: 100%; 
            height: 100%; 
            object-fit: cover; 
            display: block;
        }
        
        .card-info { 
            position: absolute; bottom: 0; width: 100%; 
            padding: 40px 15px 15px; 
            background: linear-gradient(transparent, rgba(0,0,0,0.8)); 
            color: white; 
        }

        .controls {
            padding: 15px;
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-shrink: 0;
        }

        .btn {
            width: 60px; height: 60px; border-radius: 50%; border: none;
            font-size: 24px; display: flex; align-items: center; justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        /* FIX: Navigation is now strictly above the home bar */
        .nav { 
            height: 65px; 
            border-top: 1px solid #eee; 
            display: flex; 
            justify-content: space-around; 
            align-items: center; 
            background: #fff;
            flex-shrink: 0;
        }
        .nav-item { font-size: 28px; cursor: pointer; color: #ccc; }
        .nav-item.active { color: var(--primary); }

        #match-popup { 
            position: absolute; inset: 0; background: rgba(0,0,0,0.95); 
            z-index: 9999; display: none; flex-direction: column; 
            justify-content: center; align-items: center; color: white;
        }
    </style>
</head>
<body>

<div class="app-shell">
    <div id="match-popup">
        <h1 style="color:var(--primary); font-size: 32px;">DEU MATCH!</h1>
        <button onclick="closeMatch()" style="margin-top:20px; padding:15px 30px; border-radius:30px; border:none; background:var(--gradient); color:#fff;">Continuar</button>
    </div>

    <div id="view-discover" class="view active">
        <div class="header">Elo &#128293;</div>
        <div class="stack-area"><div id="card-stack"></div></div>
        <div class="controls">
            <button onclick="swipe(false)" class="btn" style="background:#fff; color:red;">✕</button>
            <button onclick="swipe(true)" class="btn" style="background:var(--gradient); color:#fff;">❤</button>
        </div>
    </div>

    <div id="view-inbox" class="view">
        <div class="header" style="color:#000">Mensagens</div>
        <div id="inbox-list" style="overflow-y:auto; flex:1;"></div>
    </div>

    <div class="nav">
        <div class="nav-item active" onclick="showView('discover', this)">&#128149;</div>
        <div class="nav-item" onclick="showView('inbox', this)">💬</div>
    </div>
</div>

<script src="script.js"></script>
</body>
</html>
