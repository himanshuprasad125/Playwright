/*Create a brand new event from the admin panel, then complete a booking for that event, 
and finally verify the seat count drops by exactly 1.*/

const {test, expect} = require('@playwright/test')

test('Assignment' , async({page}) =>
{
    await page.goto("https://eventhub.rahulshettyacademy.com/");
    await page.getByPlaceholder("you@email.com").fill("himanshu.prasad125@gmail.com");
    await page.getByLabel("password").fill("Himanshu@1");
    await page.locator("#login-btn").click();
    await expect(page.getByText('Browse Events →')).toBeVisible();
    await page.getByRole('button', {name: 'Admin'}).click();
    await page.getByRole('link', {name: 'Manage Events'}).first().click();

    const eventTitle = `Rakhi Event ${Date.now()}`;
    await page.locator('#event-title-input').fill(eventTitle);
    await page.locator('#admin-event-form textarea').fill("Festival of brother & sister");
    await page.getByLabel('city').fill('Noida');
    await page.getByLabel('venue').fill('Sector63A');
    await page.locator("[id*='event-date']").pressSequentially('08282026');
    await page.locator("[id*='event-date']").press('ArrowRight');
    await page.locator("[id*='event-date']").pressSequentially('1030AM');
    await page.locator("[id*='price']").fill('100');
    await page.locator('#total-seats').fill('78');
    await page.locator('#add-event-btn').click();

    await expect(page.getByText('Event created!' , {exact: false})).toBeVisible();

    await page.getByRole('link', {name:'Events' , exact:true}).click();
    const eventCards = await page.locator("[data-testid='event-card']");
    await expect(eventCards.first()).toBeVisible();
    await expect(eventCards.filter({hasText: eventTitle, exact:true})).toBeVisible({timeout:5000});

    const seatsBefore=await eventCards.filter({hasText: eventTitle, exact:true}).getByText("seats" , {exact: false}).textContent();
    const seatsBeforeBooking=seatsBefore.split(" ")[0];
    console.log(seatsBeforeBooking);
    
    await eventCards.filter({hasText: eventTitle, exact:true}).locator("#book-now-btn").click();
    await expect(page.locator("#ticket-count")).toHaveText("1");
    await page.locator("#customerName").fill("Himanshu Prasad");
    await page.locator("#customer-email").fill("himanshu@gmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("98765432210");
    await page.locator(".confirm-booking-btn").click();

    await expect(page.locator(".booking-ref")).toBeVisible();
    const bookingRef = await page.locator(".booking-ref").textContent();
    
    await page.locator("#nav-bookings").click();
    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");

    await expect(page.locator("#booking-card").first()).toBeVisible();
    await expect(page.locator("#booking-card").filter({hasText: bookingRef})).toBeVisible();
    await expect(page.locator("#booking-card").filter({hasText: bookingRef})).toContainText(eventTitle);

    await page.getByRole('link', {name:'Events' , exact:true}).click();
    await expect(eventCards.first()).toBeVisible();
    await expect(eventCards.filter({hasText: eventTitle, exact:true})).toBeVisible({timeout:5000});

    await page.waitForTimeout(50);

    const seatsAfter=await eventCards.filter({hasText: eventTitle, exact:true}).getByText("seats" , {exact: false}).textContent();
    const seatsAfterBooking=seatsAfter.split(" ")[0];
    console.log(seatsAfterBooking);
    
    await expect(seatsAfterBooking-0).toBe(seatsBeforeBooking - 1);
})