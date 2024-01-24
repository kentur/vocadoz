import React, { useEffect } from 'react'

const ApplePayButton = (onPaymentAuthorized) => {
    useEffect(() => {
        if (window.ApplePaySession) {
            // Set up Apple Pay session and handlers here
            // Refer to the Apple Pay JS API documentation for details
        } else {
            console.error('Apple Pay is not supported on this device.')
        }
    }, [])

    const startApplePaySession = async () => {
        if (window.ApplePaySession) {
            const appleSession = window.ApplePaySession

            // Define ApplePayPaymentRequest
            const request = {
                countryCode: 'US',
                currencyCode: 'USD',
                merchantCapabilities: ['supports3DS'],
                supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
                total: {
                    label: 'Demo (Card is not charged)',
                    type: 'final',
                    amount: '2.00', // harcoded amount
                },
            }

            const session = new appleSession(6, request)

            session.onvalidatemerchant = async function (event) {
                try {
                    const { data } = await getApplePay()

                    session.completeMerchantValidation(data)
                } catch (error) {
                    console.log(error)
                }
            }

            session.onpaymentauthorized = async function (event) {
                onPaymentAuthorized(event)
            }

            session.begin()
        }
    }

    return (
        window.ApplePaySession && (
            <button onClick={startApplePaySession}>
                <apple-pay-button
                    buttonstyle="black"
                    type="plain"
                    locale="en-US"
                ></apple-pay-button>
            </button>
        )
    )
}

export default ApplePayButton
