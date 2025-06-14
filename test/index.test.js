/**
 * @jest-environment jsdom
 */

const {
  fetchWeatherData,
  displayWeather,
  displayError,
} = require('../weather')

describe('fetchWeatherData', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
    document.body.innerHTML = `
      <div id="weather-display"></div>
      <div id="error-message" class="hidden"></div>
    `
  })

  it('should fetch weather data for a valid city', async () => {
    const mockGeoResponse = {
      results: [{ latitude: 40.7128, longitude: -74.006 }],
    }

    const mockWeatherResponse = {
      current_weather: {
        temperature: 25,
        windspeed: 10,
        winddirection: 180,
        time: "2025-06-14T18:00",
      },
    }

    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockGeoResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockWeatherResponse,
      })

    await fetchWeatherData('New York')

    const weatherDisplay = document.getElementById('weather-display')
    expect(weatherDisplay.innerHTML).toContain('Temperature:')
    expect(weatherDisplay.innerHTML).toContain('25')
    expect(weatherDisplay.innerHTML).toContain('km/h')
  })

  it('should throw an error for an invalid city', async () => {
    const mockGeoResponse = { results: [] }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockGeoResponse,
    })

    await expect(fetchWeatherData('InvalidCity')).rejects.toThrow(
      'City not found.'
    )
  })

  it('should throw an error for network issues', async () => {
    fetch.mockRejectedValueOnce(new Error('Network Error'))

    await expect(fetchWeatherData('New York')).rejects.toThrow('Network Error')
  })
})

describe('displayWeather', () => {
  let weatherDisplay

  beforeEach(() => {
    document.body.innerHTML = '<div id="weather-display"></div>'
    weatherDisplay = document.getElementById('weather-display')
  })

  it('should display weather data on the page', () => {
    const mockData = {
      current_weather: {
        temperature: 25,
        windspeed: 10,
        winddirection: 180,
        time: "2025-06-14T18:00",
      },
    }

    displayWeather(mockData)

    expect(weatherDisplay.innerHTML).toContain('Temperature:')
    expect(weatherDisplay.innerHTML).toContain('25')
    expect(weatherDisplay.innerHTML).toContain('km/h')
    expect(weatherDisplay.innerHTML).toContain('2025')
  })
})

describe('displayError', () => {
  let errorMessage

  beforeEach(() => {
    document.body.innerHTML = '<div id="error-message" class="hidden"></div>'
    errorMessage = document.getElementById('error-message')
  })

  it('should display an error message', () => {
    displayError('City not found.')

    expect(errorMessage.textContent).toBe('City not found.')
    expect(errorMessage.classList.contains('hidden')).toBe(false)
  })

  it('should replace any existing error message', () => {
    errorMessage.textContent = 'Old message'
    displayError('New error occurred')

    expect(errorMessage.textContent).toBe('New error occurred')
  })
})
