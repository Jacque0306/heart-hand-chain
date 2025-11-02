# Configuración de RPC para HelpChain

## Variables de Entorno

El proyecto ahora incluye soporte para configurar tu propia RPC URL para conectarte a la blockchain de Polygon.

### Archivo .env

Las siguientes variables están disponibles en el archivo `.env`:

```bash
# Blockchain Configuration
VITE_RPC_URL="https://rpc-amoy.polygon.technology/"
VITE_CONTRACT_ADDRESS=""
```

## Opciones de RPC URL

### 1. Alchemy (Recomendado)
Alchemy ofrece APIs rápidas y confiables con monitoreo avanzado.

**Pasos:**
1. Regístrate en [alchemy.com](https://www.alchemy.com/)
2. Crea una nueva app para Polygon Amoy (testnet)
3. Copia tu HTTP URL
4. Actualiza `.env`:
```bash
VITE_RPC_URL="https://polygon-amoy.g.alchemy.com/v2/TU-API-KEY"
```

### 2. Infura
Infura es otra opción popular para APIs de blockchain.

**Pasos:**
1. Regístrate en [infura.io](https://www.infura.io/)
2. Crea un nuevo proyecto
3. Selecciona Polygon Amoy en las redes
4. Copia tu endpoint
5. Actualiza `.env`:
```bash
VITE_RPC_URL="https://polygon-amoy.infura.io/v3/TU-PROJECT-ID"
```

### 3. Polygon Public RPC (Por Defecto)
El proyecto viene configurado con la RPC pública de Polygon:
```bash
VITE_RPC_URL="https://rpc-amoy.polygon.technology/"
```

**Nota:** La RPC pública puede tener límites de tasa y menor rendimiento que servicios como Alchemy o Infura.

## Configuración del Smart Contract

Después de desplegar tu contrato inteligente:

1. Copia la dirección del contrato desplegado
2. Actualiza `.env`:
```bash
VITE_CONTRACT_ADDRESS="0xTU_DIRECCION_DEL_CONTRATO"
```

## Información de la Red

- **Red:** Polygon Amoy Testnet (anteriormente Mumbai)
- **Chain ID:** 80002
- **Moneda:** MATIC
- **Block Explorer:** https://amoy.polygonscan.com

## Obtener Tokens de Prueba

Para interactuar con la red de prueba, necesitarás MATIC de prueba:

1. Visita [Polygon Faucet](https://faucet.polygon.technology/)
2. Selecciona Amoy Testnet
3. Ingresa tu dirección de wallet
4. Solicita tokens de prueba

## Conexión de Wallet

La aplicación soporta MetaMask y otros wallets compatibles con EIP-1193. Al conectar tu wallet:

1. Se te pedirá que cambies a Polygon Amoy si no estás en esa red
2. Si la red no está configurada, se agregará automáticamente
3. Verás tu dirección conectada en la navegación

## Uso en el Código

El hook `useWeb3` está disponible en toda la aplicación:

```typescript
import { useWeb3 } from "@/hooks/useWeb3";

function MyComponent() {
  const { account, connectWallet, provider, signer } = useWeb3();
  
  // Usar provider para lecturas
  // Usar signer para transacciones
}
```

## Configuración del Blockchain

Todas las configuraciones de blockchain están centralizadas en:
```
src/config/blockchain.ts
```

Puedes modificar este archivo para cambiar redes o agregar configuraciones adicionales.
