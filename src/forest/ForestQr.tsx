// QR-код в мире Леса: прямой, контрастный, на ровной светлой плите с тихой зоной — без искажений, перспективы и анимации модулей.
import QrCode from '../components/QrCode'

export function ForestQr({ value, ink = '#0d1a15' }: { value: string; ink?: string }) {
  return <div className="fo-qr"><QrCode value={value} quiet ink={ink} title="QR для подключения" /></div>
}
