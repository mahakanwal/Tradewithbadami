-- ==========================================================================
-- Trade With Badami — move the 10 existing articles into the database.
-- Run ONCE in Supabase > SQL Editor, AFTER 01-schema.sql. Safe to re-run.
-- ==========================================================================

insert into public.posts (slug,title,excerpt,content,category,cover_url,meta_description,keywords,read_minutes,published,published_at)
values ($tw$boom-and-crash-indices-explained$tw$,$tw$Boom and Crash Indices Explained: How Spikes Really Work$tw$,$tw$What the numbers in Boom 1000 and Crash 500 actually mean, why spikes cannot be predicted tick by tick, and the risk rules that keep you in the game.$tw$,$tw$<p>Boom and Crash are the most talked-about indices on Deriv. Screenshots of huge spikes go viral in trading groups every day — but so do blown accounts. Understanding how these indices behave is the first step to trading them sensibly.</p>
<h2>What are Boom and Crash indices?</h2>
<p>Boom and Crash are synthetic indices available 24/7 on Deriv MT5. Their behaviour is simple to describe:</p>
<ul>
<li><strong>Boom indices</strong> drift slowly downward most of the time, with sudden sharp <strong>upward spikes</strong>.</li>
<li><strong>Crash indices</strong> drift slowly upward most of the time, with sudden sharp <strong>downward spikes</strong>.</li>
</ul>
<h2>What does the number mean?</h2>
<p>The number in the name tells you the average spike frequency in ticks. A tick is one price update.</p>
<div class="table-wrap"><table>
<thead><tr><th>Index</th><th>Spike direction</th><th>Average frequency</th></tr></thead>
<tbody>
<tr><td>Boom 1000</td><td>Up</td><td>About 1 spike every 1,000 ticks</td></tr>
<tr><td>Boom 500</td><td>Up</td><td>About 1 spike every 500 ticks</td></tr>
<tr><td>Boom 300</td><td>Up</td><td>About 1 spike every 300 ticks</td></tr>
<tr><td>Crash 1000</td><td>Down</td><td>About 1 spike every 1,000 ticks</td></tr>
<tr><td>Crash 500</td><td>Down</td><td>About 1 spike every 500 ticks</td></tr>
<tr><td>Crash 300</td><td>Down</td><td>About 1 spike every 300 ticks</td></tr>
</tbody></table></div>
<p>Deriv also lists other variations, such as Boom 600, Boom 900, Crash 600 and Crash 900. The idea is the same: a lower number means more frequent spikes.</p>
<div class="callout is-warning"><strong>"Average" is the key word</strong>A spike every 1,000 ticks on average does not mean a spike arrives at tick 1,000. Two spikes can appear close together, or there can be a very long gap. Each tick is random, so counting ticks cannot predict the next spike.</div>
<h2>Two ways traders approach Boom and Crash</h2>
<h3>1. Trading with the drift</h3>
<p>On Boom, this means selling during the slow downward drift; on Crash, buying during the slow upward drift. The trend is your friend most of the time, but a single spike against you can erase many small wins. A stop loss is not optional here.</p>
<h3>2. Trading for the spike</h3>
<p>Here the trader buys Boom or sells Crash, hoping to catch a spike. Each spike can be large, but you may wait a long time while the drift slowly moves against you. Without strict risk limits this style drains accounts.</p>
<h2>Using price action on Boom and Crash</h2>
<p>In our live sessions we combine price action with clear levels:</p>
<ul>
<li>Mark <strong>support and resistance zones</strong> on higher timeframes (H1, H4).</li>
<li>Look for the drift to approach a zone and show rejection on M5 or M15 candles.</li>
<li>Plan the stop loss beyond the zone, and size the trade so the stop equals your fixed risk.</li>
<li>Skip trades when price is in the middle of nowhere.</li>
</ul>
<p>This does not make spikes predictable. It simply gives you a structured reason for every entry and a defined exit if you are wrong.</p>
<h2>Lot size matters more than the entry</h2>
<p>Boom and Crash have contract specifications that differ from forex. Before trading, right-click the symbol in MT5, open <strong>Specification</strong> and check the minimum volume and contract size. Then use a risk calculator so that a stop-loss hit costs no more than 1–2% of your balance. Our <a href="post.html?slug=risk-management-synthetic-indices">risk management guide</a> walks through the maths.</p>
<h2>Common Boom and Crash mistakes</h2>
<ol>
<li>Believing tick counters or "spike detector" tools can predict spikes.</li>
<li>Holding losing spike trades for hours while the drift eats the account.</li>
<li>Using the maximum lot because a demo account looked profitable.</li>
<li>Trading every index at once instead of mastering one.</li>
</ol>
<aside class="takeaways">
<h2>Key Takeaways</h2>
<ul class="check-list"><li>Boom spikes up and drifts down; Crash spikes down and drifts up.</li><li>The number is an average spike frequency in ticks, not a countdown.</li><li>Spikes are random — use levels and stop losses, not tick counters.</li><li>Check the contract specification and size every trade by risk.</li></ul>
</aside>
<h2>Frequently Asked Questions</h2>
<div class="accordion faq-accordion" id="postFaq">
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-0" aria-expanded="true" class="accordion-button" data-bs-target="#postFaq-0" data-bs-toggle="collapse" type="button">Can Boom and Crash spikes be predicted?</button>
</h3>
<div class="accordion-collapse collapse show" data-bs-parent="#postFaq" id="postFaq-0">
<div class="accordion-body">No. Each tick is generated randomly, so spike timing cannot be predicted. Strategies should focus on levels, structure and risk control rather than prediction.</div>
</div>
</div>
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-1" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#postFaq-1" data-bs-toggle="collapse" type="button">Which is better for beginners, Boom 1000 or Boom 500?</button>
</h3>
<div class="accordion-collapse collapse" data-bs-parent="#postFaq" id="postFaq-1">
<div class="accordion-body">Boom 1000 has fewer spikes, so the drift is smoother. Many beginners find it easier to read, but the right choice depends on your plan and risk per trade.</div>
</div>
</div>
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-2" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#postFaq-2" data-bs-toggle="collapse" type="button">Are Boom and Crash available on weekends?</button>
</h3>
<div class="accordion-collapse collapse" data-bs-parent="#postFaq" id="postFaq-2">
<div class="accordion-body">Yes. Like all Deriv synthetic indices, they are available 24 hours a day, 7 days a week.</div>
</div>
</div>
</div>$tw$,$tw$synthetic-indices$tw$,$tw$/assets/images/blog/boom-and-crash-indices-explained.webp$tw$,$tw$Understand Boom 1000, Boom 500, Crash 1000 and other Boom and Crash indices on Deriv: how spikes work, what the numbers mean and how to trade them with controlled risk.$tw$,$tw$boom and crash, boom 1000, crash 1000, boom 500, crash 500, deriv spikes, boom crash strategy$tw$,8,true,'2026-09-15T09:00:00+05:00')
on conflict (slug) do nothing;

insert into public.posts (slug,title,excerpt,content,category,cover_url,meta_description,keywords,read_minutes,published,published_at)
values ($tw$deriv-mt5-setup-guide$tw$,$tw$Deriv MT5 Setup Guide: Login, Add Symbols and Place Your First Trade$tw$,$tw$Create your MT5 account, log in with the correct server, add Boom, Crash and volatility indices, and place your first trade with SL and TP.$tw$,$tw$<p>Most questions in our WhatsApp group during the first week of a batch are about MT5: "Which server?", "Where is Boom 1000?", "How do I set a stop loss?" This guide answers all of them in order.</p>
<h2>Step 1: Create your Deriv MT5 account</h2>
<p>Log in to Deriv and open the Trader's Hub. In the CFDs section, add a Deriv MT5 account — start with a <strong>demo</strong>. Choose the account type that includes the markets you want (for synthetic indices this is usually the Standard account). Set an MT5 password.</p>
<h2>Step 2: Note your login and server</h2>
<p>After creating the account, Deriv shows:</p>
<ul>
<li><strong>MT5 login</strong> — a number that identifies your trading account.</li>
<li><strong>Server</strong> — the exact server name for your account.</li>
</ul>
<p>Use the server name <strong>exactly as shown</strong> in your Deriv dashboard. Choosing a different server is the number one reason for "Invalid account" errors.</p>
<h2>Step 3: Install MT5 and log in</h2>
<h3>On mobile (Android / iPhone)</h3>
<ol>
<li>Install MetaTrader 5 from the official app store.</li>
<li>Open Settings → New Account / Login to an existing account.</li>
<li>Search "Deriv" and select the server that matches your dashboard.</li>
<li>Enter your MT5 login and MT5 password.</li>
</ol>
<h3>On desktop or web</h3>
<p>Download MT5 from your Deriv dashboard or use the web terminal link Deriv provides. Go to File → Login to Trade Account and enter the same login, password and server.</p>
<h2>Step 4: Add Boom, Crash and volatility indices</h2>
<p>New accounts show only a few symbols. To add more:</p>
<ul>
<li><strong>Mobile:</strong> open Quotes, tap the + icon and search for the name, for example "Crash 1000" or "Volatility 75".</li>
<li><strong>Desktop:</strong> right-click inside Market Watch and choose Symbols (or Show All), then find and enable the indices you want.</li>
</ul>
<h2>Step 5: Check the specification</h2>
<p>Before trading any symbol, open its <strong>Specification</strong> (desktop: right-click → Specification). Note the minimum volume, volume step and contract size. These differ between instruments and directly affect your risk.</p>
<h2>Step 6: Place a trade with SL and TP</h2>
<ol>
<li>Open the chart of the symbol and tap or click New Order.</li>
<li>Enter the volume you calculated from your risk.</li>
<li>Set the <strong>Stop Loss</strong> and <strong>Take Profit</strong> prices.</li>
<li>Choose Buy or Sell.</li>
</ol>
<p>You can also drag SL and TP lines on the chart after opening the trade. Confirm both are visible before you leave the screen.</p>
<h2>Step 7: Set up your chart properly</h2>
<ul>
<li>Use candlesticks and switch between H1, M15 and M5.</li>
<li>Draw horizontal lines for key support and resistance.</li>
<li>Keep indicators minimal — clean charts make clearer decisions.</li>
</ul>
<h2>Troubleshooting</h2>
<div class="table-wrap"><table>
<thead><tr><th>Problem</th><th>Likely fix</th></tr></thead>
<tbody>
<tr><td>Invalid account</td><td>Check the server name and use the MT5 password, not your Deriv password.</td></tr>
<tr><td>Symbol not found</td><td>Make sure your account type includes that market, then search the full name.</td></tr>
<tr><td>Invalid volume</td><td>Use the minimum volume and step shown in the Specification.</td></tr>
<tr><td>No balance in MT5</td><td>Transfer funds from your Deriv account to the MT5 account.</td></tr>
</tbody></table></div>
<aside class="takeaways">
<h2>Key Takeaways</h2>
<ul class="check-list"><li>Start with a demo MT5 account and note the login and server.</li><li>Use the server name exactly as shown in your Deriv dashboard.</li><li>Add symbols from Quotes or Market Watch and check each Specification.</li><li>Never open a trade without a stop loss and take profit.</li></ul>
</aside>
<h2>Frequently Asked Questions</h2>
<div class="accordion faq-accordion" id="postFaq">
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-0" aria-expanded="true" class="accordion-button" data-bs-target="#postFaq-0" data-bs-toggle="collapse" type="button">Why does MT5 say invalid account?</button>
</h3>
<div class="accordion-collapse collapse show" data-bs-parent="#postFaq" id="postFaq-0">
<div class="accordion-body">Usually the server is wrong or the password used is your Deriv password instead of your MT5 password. Check both in your Deriv dashboard.</div>
</div>
</div>
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-1" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#postFaq-1" data-bs-toggle="collapse" type="button">Where can I find Boom and Crash in MT5?</button>
</h3>
<div class="accordion-collapse collapse" data-bs-parent="#postFaq" id="postFaq-1">
<div class="accordion-body">Search for them in Quotes (mobile) or Market Watch → Symbols (desktop). They are available on account types that include synthetic indices.</div>
</div>
</div>
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-2" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#postFaq-2" data-bs-toggle="collapse" type="button">Can I use one MT5 account on phone and laptop?</button>
</h3>
<div class="accordion-collapse collapse" data-bs-parent="#postFaq" id="postFaq-2">
<div class="accordion-body">Yes. Log in with the same login, password and server on as many devices as you like.</div>
</div>
</div>
</div>$tw$,$tw$platforms$tw$,$tw$/assets/images/blog/deriv-mt5-setup-guide.webp$tw$,$tw$Step-by-step Deriv MT5 setup: create your MT5 account, find your login and server, log in on mobile or desktop, add synthetic indices and place a trade with stop loss.$tw$,$tw$deriv mt5 login, deriv mt5 server, how to use mt5 deriv, add boom and crash mt5, mt5 setup$tw$,7,true,'2026-07-18T09:00:00+05:00')
on conflict (slug) do nothing;

insert into public.posts (slug,title,excerpt,content,category,cover_url,meta_description,keywords,read_minutes,published,published_at)
values ($tw$deriv-platforms-compared$tw$,$tw$Deriv Platforms Compared: MT5, cTrader, Deriv Trader and Deriv Bot$tw$,$tw$Which Deriv platform should you use? A practical comparison of MT5, cTrader, Deriv Trader and Deriv Bot for different trading styles.$tw$,$tw$<p>One Deriv account gives you access to several platforms. Each one is built for a different style of trading, and choosing the wrong one makes learning harder than it needs to be. Here is a practical comparison.</p>
<h2>Quick comparison</h2>
<div class="table-wrap"><table>
<thead><tr><th>Platform</th><th>Best for</th><th>Main products</th></tr></thead>
<tbody>
<tr><td>Deriv MT5</td><td>Chart-based traders, signals, price action</td><td>CFDs on forex, gold, synthetic indices and more</td></tr>
<tr><td>Deriv cTrader</td><td>Traders who prefer a modern CFD interface</td><td>CFDs on a range of markets</td></tr>
<tr><td>Deriv Trader</td><td>Short-term contracts with fixed risk</td><td>Options, multipliers, accumulators</td></tr>
<tr><td>Deriv Bot</td><td>Automating simple rules without coding</td><td>Automated trading of options-style contracts</td></tr>
</tbody></table></div>
<h2>Deriv MT5</h2>
<p>MetaTrader 5 is the industry-standard platform, and it is what we use for our signals and live sessions. It offers professional charts, many timeframes, indicators, one-click trading and full control over stop loss and take profit. It runs on Windows, Mac, a web browser, Android and iPhone.</p>
<p><strong>Choose MT5 if</strong> you want to learn proper chart analysis, follow our signals or trade Boom and Crash, volatility indices, forex and gold from one place. See the <a href="post.html?slug=deriv-mt5-setup-guide">MT5 setup guide</a>.</p>
<h2>Deriv cTrader</h2>
<p>cTrader is another CFD platform with a clean, modern layout and advanced order options. Some traders simply prefer how it looks and feels. The core idea — buying or selling CFDs with stop loss and take profit — is the same as MT5.</p>
<h2>Deriv Trader</h2>
<p>Deriv Trader is a web platform for contracts rather than classic CFD positions. Common trade types include:</p>
<ul>
<li><strong>Options</strong> such as Rise/Fall and Higher/Lower, with a known stake and payout.</li>
<li><strong>Multipliers</strong>, which amplify price movement while limiting loss to your stake.</li>
<li><strong>Accumulators</strong>, which grow a payout as long as price stays within a range.</li>
</ul>
<p>The appeal is that your maximum loss is usually your stake. The danger is that short-duration contracts encourage fast, emotional trading. Treat every stake as real risk.</p>
<h2>Deriv Bot</h2>
<p>Deriv Bot lets you build automated strategies by dragging blocks, with no coding needed. It is useful for testing simple ideas on demo. Be very careful with bots that promise guaranteed profit or use martingale (doubling the stake after each loss) — a short losing streak can empty an account.</p>
<h2>Which platform should you start with?</h2>
<p>For most of our students the answer is <strong>Deriv MT5</strong>. Chart skills learned on MT5 transfer to every other market and platform, and it gives you full control of risk on each trade. Once you understand price action and position sizing, you can explore the others with a clearer head.</p>
<aside class="takeaways">
<h2>Key Takeaways</h2>
<ul class="check-list"><li>Deriv MT5 is the best all-round choice for chart-based trading and signals.</li><li>Deriv Trader focuses on options, multipliers and accumulators.</li><li>Deriv Bot automates rules — avoid martingale-style bots.</li><li>Learn one platform deeply before exploring others.</li></ul>
</aside>
<h2>Frequently Asked Questions</h2>
<div class="accordion faq-accordion" id="postFaq">
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-0" aria-expanded="true" class="accordion-button" data-bs-target="#postFaq-0" data-bs-toggle="collapse" type="button">Can I use MT5 and Deriv Trader with the same account?</button>
</h3>
<div class="accordion-collapse collapse show" data-bs-parent="#postFaq" id="postFaq-0">
<div class="accordion-body">Yes. Your Deriv account gives access to the different platforms. MT5 uses its own trading account that you fund by transferring from your Deriv balance.</div>
</div>
</div>
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-1" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#postFaq-1" data-bs-toggle="collapse" type="button">Is Deriv MT5 available on mobile?</button>
</h3>
<div class="accordion-collapse collapse" data-bs-parent="#postFaq" id="postFaq-1">
<div class="accordion-body">Yes. You can use the MetaTrader 5 app on Android and iPhone and log in with your Deriv MT5 details.</div>
</div>
</div>
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-2" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#postFaq-2" data-bs-toggle="collapse" type="button">Which platform do your signals use?</button>
</h3>
<div class="accordion-collapse collapse" data-bs-parent="#postFaq" id="postFaq-2">
<div class="accordion-body">Our signals are shared for Deriv MT5, with entry, stop loss and take profit levels you can place directly on the chart.</div>
</div>
</div>
</div>$tw$,$tw$platforms$tw$,$tw$/assets/images/blog/deriv-platforms-compared.webp$tw$,$tw$Compare the main Deriv trading platforms — Deriv MT5, Deriv cTrader, Deriv Trader and Deriv Bot — and find out which one suits your trading style.$tw$,$tw$deriv mt5, deriv ctrader, deriv trader, deriv bot, deriv platforms comparison$tw$,6,true,'2026-08-30T09:00:00+05:00')
on conflict (slug) do nothing;

insert into public.posts (slug,title,excerpt,content,category,cover_url,meta_description,keywords,read_minutes,published,published_at)
values ($tw$how-to-follow-trading-signals$tw$,$tw$How to Follow Trading Signals Without Blowing Your Account$tw$,$tw$Signals are a learning tool, not a money machine. How to read them, size them to your account and avoid the mistakes that make good signals lose money.$tw$,$tw$<p>Our free signal group is one of the most popular parts of the academy. But we often see two students follow the same signal and get completely different results. The difference is almost never the signal — it is how it was followed.</p>
<h2>Understand what a signal contains</h2>
<p>A complete signal has four parts:</p>
<ul>
<li><strong>Instrument</strong> — for example Crash 1000, Boom 500 or XAUUSD.</li>
<li><strong>Direction and entry</strong> — buy or sell, at market or at a specific price.</li>
<li><strong>Stop loss (SL)</strong> — where the idea is wrong and the trade closes.</li>
<li><strong>Take profit (TP)</strong> — one or more target levels.</li>
</ul>
<p>If a message has no stop loss, it is not a signal — it is a guess. Never trade it.</p>
<h2>Use your own lot size</h2>
<p>The lot size someone else uses means nothing for your account. Use the signal's entry and stop loss to calculate your own volume so that a stop-loss hit costs 1–2% of your balance. Our <a href="post.html?slug=risk-management-synthetic-indices">risk management guide</a> explains how.</p>
<h2>Do not chase late entries</h2>
<p>If price has already moved far from the entry, the risk-to-reward is no longer the same. Your stop is now further away and your target closer. A simple rule: <strong>if price has covered more than a third of the way to TP1, skip the trade</strong>. Another signal will come.</p>
<h2>Place SL and TP immediately</h2>
<p>Enter the stop loss and take profit in MT5 as soon as the trade is open. Phones die, internet drops and markets move while you are away. A trade protected by an SL survives all of that.</p>
<h2>Manage partial targets the same way every time</h2>
<p>When a signal has multiple targets, decide a routine in advance — for example, close half at TP1 and move the stop to entry, then let the rest run to TP2. Consistency matters more than the exact method.</p>
<h2>Learn from every signal</h2>
<p>Signals are most valuable as a classroom. For each one, open the chart and ask:</p>
<ol>
<li>Why was the entry here? Which level or pattern does it respect?</li>
<li>Why was the stop placed there?</li>
<li>What did price do afterwards, and why?</li>
</ol>
<p>Screenshot the chart and save it in your <a href="post.html?slug=trading-journal-improve-results">journal</a>. After a few weeks you will start spotting the same setups yourself — which is the real goal of our batches.</p>
<h2>Common mistakes with signals</h2>
<ul>
<li>Following signals from many groups at once and taking conflicting trades.</li>
<li>Doubling the lot after a loss to "win it back".</li>
<li>Closing winners early and holding losers past the stop.</li>
<li>Judging a signal provider on one or two trades instead of a long sample.</li>
</ul>
<div class="callout"><strong>Honest reminder</strong>No signal provider wins every trade. Past results, including the results we share, do not guarantee future performance. Protect every trade with a stop loss and trade only money you can afford to lose.</div>
<aside class="takeaways">
<h2>Key Takeaways</h2>
<ul class="check-list"><li>A real signal always includes a stop loss.</li><li>Calculate your own lot size from the signal's stop distance.</li><li>Skip entries that have already moved far toward the target.</li><li>Use signals to learn setups, not just to copy trades.</li></ul>
</aside>
<h2>Frequently Asked Questions</h2>
<div class="accordion faq-accordion" id="postFaq">
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-0" aria-expanded="true" class="accordion-button" data-bs-target="#postFaq-0" data-bs-toggle="collapse" type="button">Is your signal group free?</button>
</h3>
<div class="accordion-collapse collapse show" data-bs-parent="#postFaq" id="postFaq-0">
<div class="accordion-body">Yes. The signal group is free for members of our monthly batch. Message us on WhatsApp to join the next batch.</div>
</div>
</div>
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-1" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#postFaq-1" data-bs-toggle="collapse" type="button">Which markets do the signals cover?</button>
</h3>
<div class="accordion-collapse collapse" data-bs-parent="#postFaq" id="postFaq-1">
<div class="accordion-body">Mainly Deriv synthetic indices such as Boom and Crash, plus gold (XAUUSD) and selected forex pairs, shared for Deriv MT5.</div>
</div>
</div>
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-2" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#postFaq-2" data-bs-toggle="collapse" type="button">Can I make money only by copying signals?</button>
</h3>
<div class="accordion-collapse collapse" data-bs-parent="#postFaq" id="postFaq-2">
<div class="accordion-body">Signals can help, but long-term results depend on your risk management and discipline. That is why we teach the reasoning behind every setup.</div>
</div>
</div>
</div>$tw$,$tw$strategy$tw$,$tw$/assets/images/blog/how-to-follow-trading-signals.webp$tw$,$tw$A practical guide to following trading signals on Deriv MT5: reading entry, stop loss and take profit, sizing your lot, handling late entries and learning from every signal.$tw$,$tw$trading signals, deriv signals, free signal group, how to follow signals, boom crash signals$tw$,7,true,'2026-08-14T09:00:00+05:00')
on conflict (slug) do nothing;

insert into public.posts (slug,title,excerpt,content,category,cover_url,meta_description,keywords,read_minutes,published,published_at)
values ($tw$how-to-open-deriv-account$tw$,$tw$How to Open and Verify a Deriv Account: Step-by-Step Guide$tw$,$tw$From sign-up to verification and your first MT5 account — every step explained, plus the mistakes that cause delays when you want to withdraw.$tw$,$tw$<p>Opening a Deriv account only takes a few minutes, but small mistakes during registration — a wrong country, a name that does not match your ID — can cause problems later when you try to withdraw. Follow these steps carefully and do it right the first time.</p>
<h2>Before you start</h2>
<p>Keep these ready:</p>
<ul>
<li>An email address you check regularly.</li>
<li>A valid identity document (CNIC, passport or driving licence).</li>
<li>A recent proof of address, such as a utility bill or bank statement, showing your name and address.</li>
<li>A clear phone camera for photos and the selfie check.</li>
</ul>
<h2>Step 1: Sign up with your email</h2>
<p>Go to the Deriv website and choose to create a free account. Enter your email and confirm it using the link Deriv sends you. If you do not see the email, check the spam folder.</p>
<h2>Step 2: Choose country and set a password</h2>
<p>Select your <strong>country of residence</strong> and citizenship accurately. This decides which Deriv entity you register with and which products you can use, and it cannot simply be changed later. Set a strong password that you do not use anywhere else.</p>
<h2>Step 3: Complete your personal details</h2>
<p>Enter your full name and date of birth <strong>exactly as they appear on your ID</strong>. A spelling difference is one of the most common reasons verification gets rejected. Add your address and phone number and choose the account currency (most of our students use USD).</p>
<div class="callout is-warning"><strong>Pay attention</strong>The currency of your account usually cannot be changed once you make a deposit. Choose carefully.</div>
<h2>Step 4: Verify your identity and address</h2>
<p>From your account settings, open the verification section and upload:</p>
<ol>
<li><strong>Proof of identity</strong> — front and back of your ID, plus a selfie if requested.</li>
<li><strong>Proof of address</strong> — a document issued in recent months showing your name and address.</li>
</ol>
<p>Make sure all four corners are visible, there is no glare and the text is readable. Verification is often quick, but it can take longer during busy periods. Complete it before you trade so withdrawals are not delayed.</p>
<h2>Step 5: Explore the demo account</h2>
<p>Your new account includes a demo with virtual funds. Switch to demo and place a few trades on Deriv Trader or MT5 to understand how the platform works.</p>
<h2>Step 6: Create your Deriv MT5 account</h2>
<p>In the Trader's Hub, find the CFDs section and add a Deriv MT5 account. Depending on your country you will see account types such as <strong>Standard</strong> (synthetic indices plus financial markets) and <strong>Financial</strong>. Create a demo MT5 account first; you can add a real one later.</p>
<p>Deriv will show you an <strong>MT5 login number</strong> and <strong>server name</strong>. Note both down — you need them to log in. The full process is in our <a href="post.html?slug=deriv-mt5-setup-guide">Deriv MT5 setup guide</a>.</p>
<h2>Step 7: Deposit and transfer funds</h2>
<p>Deposits go into your main Deriv account first. From there you transfer funds to your MT5 account. Available payment methods depend on your country and change from time to time, so check the cashier for the current list. Only use official methods shown inside your Deriv account.</p>
<h2>Security tips</h2>
<ul>
<li>Turn on <strong>two-factor authentication</strong> in your security settings.</li>
<li>Never share your password or MT5 password with anyone — including "account managers" on social media.</li>
<li>Withdraw to methods in your own name.</li>
</ul>
<h2>Join through our partner link</h2>
<p>As a Deriv broker partner, Waseem supports students who open their accounts through <a href="https://t.deriv.link?t=VQLH73WYR4HD" rel="noopener sponsored" target="_blank">our Deriv partner link</a> — including help with setup questions in the free batch. Message us on WhatsApp if you get stuck at any step.</p>
<aside class="takeaways">
<h2>Key Takeaways</h2>
<ul class="check-list"><li>Use your real details exactly as written on your ID.</li><li>Choose your country and account currency carefully — they are hard to change.</li><li>Complete identity and address verification before you need to withdraw.</li><li>Save your MT5 login number and server name in a safe place.</li></ul>
</aside>
<h2>Frequently Asked Questions</h2>
<div class="accordion faq-accordion" id="postFaq">
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-0" aria-expanded="true" class="accordion-button" data-bs-target="#postFaq-0" data-bs-toggle="collapse" type="button">How long does Deriv verification take?</button>
</h3>
<div class="accordion-collapse collapse show" data-bs-parent="#postFaq" id="postFaq-0">
<div class="accordion-body">It is often completed quickly, but it can take longer during busy periods or if documents are unclear. Upload sharp photos with all corners visible to avoid delays.</div>
</div>
</div>
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-1" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#postFaq-1" data-bs-toggle="collapse" type="button">Can I open a Deriv account without verification?</button>
</h3>
<div class="accordion-collapse collapse" data-bs-parent="#postFaq" id="postFaq-1">
<div class="accordion-body">You can sign up and use the demo, but verification is required for many features, especially withdrawals. It is best to verify right away.</div>
</div>
</div>
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-2" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#postFaq-2" data-bs-toggle="collapse" type="button">What is the difference between my Deriv account and my MT5 account?</button>
</h3>
<div class="accordion-collapse collapse" data-bs-parent="#postFaq" id="postFaq-2">
<div class="accordion-body">Your Deriv account is the main wallet where you deposit and withdraw. The MT5 account is a separate trading account; you transfer funds between them inside Deriv.</div>
</div>
</div>
</div>$tw$,$tw$deriv-basics$tw$,$tw$/assets/images/blog/how-to-open-deriv-account.webp$tw$,$tw$A simple step-by-step guide to creating a Deriv account, completing your profile, verifying identity and address, and opening a Deriv MT5 account.$tw$,$tw$open deriv account, deriv sign up, deriv verification, deriv mt5 account, deriv account pakistan$tw$,7,true,'2026-09-22T09:00:00+05:00')
on conflict (slug) do nothing;

insert into public.posts (slug,title,excerpt,content,category,cover_url,meta_description,keywords,read_minutes,published,published_at)
values ($tw$risk-management-synthetic-indices$tw$,$tw$Risk Management for Synthetic Indices: Rules That Protect Your Account$tw$,$tw$The 1–2% rule, position sizing, stop losses and daily limits — the risk framework we teach every student before they trade real money.$tw$,$tw$<p>Every trader loses. The traders who last are not the ones who never lose — they are the ones whose losses are small and planned. On fast markets like Deriv's synthetic indices, risk management is not a nice extra. It is the whole game.</p>
<h2>Rule 1: Risk 1–2% per trade</h2>
<p>Decide the maximum percentage of your balance you will lose if a trade hits its stop loss. We recommend <strong>1% for beginners</strong> and never more than 2%.</p>
<p>On a $200 account, 1% is $2. That feels small — and that is the point. With 1% risk, ten losses in a row still leave you with about 90% of your account. With 10% risk, the same streak can leave you with around a third.</p>
<h2>Rule 2: Size the position from the stop loss</h2>
<p>Most beginners choose a lot size first and then place the stop wherever it fits. Reverse it:</p>
<ol>
<li>Find the logical stop-loss level on the chart (beyond support, resistance or the last swing).</li>
<li>Measure the distance from entry to stop.</li>
<li>Calculate the lot size so that distance equals your fixed risk in dollars.</li>
</ol>
<p>In MT5 you can check how much a price move is worth for a given volume in the symbol's Specification, or simply place the trade on demo with your planned stop and read the potential loss. Our <a href="index.html#calculator">risk calculator</a> shows your dollar risk and target instantly.</p>
<h2>Rule 3: Always use a stop loss</h2>
<p>Synthetic indices can move a long way in seconds, and Boom and Crash spikes can be violent. A trade without a stop loss is a trade with unlimited downside. Place the stop when you open the trade, not "later".</p>
<h2>Rule 4: Aim for a reward at least as big as the risk</h2>
<p>A risk-to-reward ratio of 1:2 means you aim to make $2 for every $1 risked. With 1:2, you can be right on only 40% of trades and still grow the account over time — before costs. Do not move your target closer just to "lock something in" while leaving the stop far away.</p>
<h2>Rule 5: Set a daily loss limit</h2>
<p>Pick a limit — for example, three losing trades or 3% of the balance in a day — and stop trading when you hit it. Most account blow-ups do not come from one bad trade; they come from revenge trading after a bad trade.</p>
<h2>Rule 6: Plan for losing streaks</h2>
<p>Even a good strategy can lose five or six times in a row. Ask yourself before every session: "If I lose my next six trades, how much will my account be down?" If the answer scares you, your risk is too high.</p>
<div class="callout is-warning"><strong>Avoid martingale</strong>Doubling your lot after every loss to "recover" may work for a while, but one long losing streak can wipe out the account. We never teach martingale in our batches.</div>
<h2>A simple pre-trade checklist</h2>
<ul>
<li>Is this setup in my written plan?</li>
<li>Where is my stop loss, and why there?</li>
<li>Is my lot size calculated from 1–2% risk?</li>
<li>Is my target at least 1:1.5 or 1:2?</li>
<li>Have I hit my daily loss limit?</li>
</ul>
<p>Write the answers in your <a href="post.html?slug=trading-journal-improve-results">trading journal</a>. Over a month, the journal will show you exactly where your money goes.</p>
<aside class="takeaways">
<h2>Key Takeaways</h2>
<ul class="check-list"><li>Risk 1% per trade as a beginner and never more than 2%.</li><li>Find the stop first, then calculate the lot size.</li><li>Every trade needs a stop loss from the moment it is opened.</li><li>Use a daily loss limit to stop revenge trading.</li></ul>
</aside>
<h2>Frequently Asked Questions</h2>
<div class="accordion faq-accordion" id="postFaq">
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-0" aria-expanded="true" class="accordion-button" data-bs-target="#postFaq-0" data-bs-toggle="collapse" type="button">What lot size should I use on a $100 account?</button>
</h3>
<div class="accordion-collapse collapse show" data-bs-parent="#postFaq" id="postFaq-0">
<div class="accordion-body">It depends on your stop distance and the instrument. Decide your risk (for example 1% = $1), place the stop at a logical level, then pick the volume where a stop-loss hit equals that amount — often the minimum lot on small accounts.</div>
</div>
</div>
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-1" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#postFaq-1" data-bs-toggle="collapse" type="button">Is 5% risk per trade too much?</button>
</h3>
<div class="accordion-collapse collapse" data-bs-parent="#postFaq" id="postFaq-1">
<div class="accordion-body">For most traders, yes. A normal losing streak at 5% risk can cut an account by a quarter or more. Keeping risk at 1–2% gives you room to learn.</div>
</div>
</div>
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-2" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#postFaq-2" data-bs-toggle="collapse" type="button">Should I move my stop loss if price comes close?</button>
</h3>
<div class="accordion-collapse collapse" data-bs-parent="#postFaq" id="postFaq-2">
<div class="accordion-body">Moving a stop further away to avoid a loss usually turns small losses into big ones. Only move a stop in the direction of profit, following your plan.</div>
</div>
</div>
</div>$tw$,$tw$risk-management$tw$,$tw$/assets/images/blog/risk-management-synthetic-indices.webp$tw$,$tw$Simple risk management rules for Deriv synthetic indices: the 1–2% rule, position sizing, stop loss placement, daily loss limits and how to survive losing streaks.$tw$,$tw$risk management trading, deriv risk management, lot size calculator, stop loss, synthetic indices risk$tw$,8,true,'2026-08-22T09:00:00+05:00')
on conflict (slug) do nothing;

insert into public.posts (slug,title,excerpt,content,category,cover_url,meta_description,keywords,read_minutes,published,published_at)
values ($tw$trading-journal-improve-results$tw$,$tw$Why Journaling Your Trades Improves Results (Free Template Inside)$tw$,$tw$The traders who improve fastest are the ones who write everything down. What to record, how to review it and the patterns it reveals.$tw$,$tw$<p>When students tell us they are "stuck", our first question is always the same: <strong>"Can I see your journal?"</strong> Most of the time there isn't one. A trading journal turns random experience into data — and data is what lets you improve.</p>
<h2>Why a journal works</h2>
<p>Memory is selective. We remember the big win and quietly forget the five small rule-breaks that cost more. A journal shows the full picture. Within a few weeks it answers questions like:</p>
<ul>
<li>Which setup actually makes money for me?</li>
<li>Which index or pair keeps losing?</li>
<li>Do I trade worse at certain times of day?</li>
<li>How much do rule-breaks cost me each month?</li>
</ul>
<h2>What to record for every trade</h2>
<div class="table-wrap"><table>
<thead><tr><th>Field</th><th>Example</th></tr></thead>
<tbody>
<tr><td>Date and time</td><td>14 Aug, 21:10 PKT</td></tr>
<tr><td>Instrument</td><td>Crash 1000</td></tr>
<tr><td>Direction</td><td>Buy</td></tr>
<tr><td>Setup name</td><td>H1 support rejection</td></tr>
<tr><td>Entry / SL / TP</td><td>Prices from MT5</td></tr>
<tr><td>Risk (% and $)</td><td>1% / $3</td></tr>
<tr><td>Result (R and $)</td><td>+2R / +$6</td></tr>
<tr><td>Followed plan?</td><td>Yes / No — why?</td></tr>
<tr><td>Emotion before entry</td><td>Calm, impatient, revenge…</td></tr>
<tr><td>Screenshot</td><td>Before and after</td></tr>
</tbody></table></div>
<p>Recording results in <strong>R</strong> (multiples of your risk) makes trades comparable even when your account size changes. A +2R trade means you made twice what you risked.</p>
<h2>Screenshots are the secret weapon</h2>
<p>Take one screenshot when you enter and one when the trade closes. Reviewing the charts later trains your eye far faster than reading numbers alone. It is the same reason we share chart screenshots of our signal results.</p>
<h2>How to review your journal weekly</h2>
<ol>
<li><strong>Count rule-breaks.</strong> Add up the results of trades where you did not follow the plan.</li>
<li><strong>Group by setup.</strong> Keep the setups with positive results; drop or fix the rest.</li>
<li><strong>Check the time of day.</strong> Many traders find one session where they consistently lose.</li>
<li><strong>Write one improvement</strong> for next week — only one, so you actually do it.</li>
</ol>
<h2>Keep it simple</h2>
<p>A notebook, a spreadsheet or a notes app all work. The best journal is the one you will fill in after every single trade. Start today with the fields above, and bring your journal to the next live session — reviewing real journals is one of the most useful parts of our mentoring.</p>
<aside class="takeaways">
<h2>Key Takeaways</h2>
<ul class="check-list"><li>A journal turns your trades into data you can learn from.</li><li>Record setup, risk, result in R, emotions and screenshots.</li><li>Review weekly and pick one improvement at a time.</li><li>Rule-breaks usually cost more than bad setups.</li></ul>
</aside>
<h2>Frequently Asked Questions</h2>
<div class="accordion faq-accordion" id="postFaq">
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-0" aria-expanded="true" class="accordion-button" data-bs-target="#postFaq-0" data-bs-toggle="collapse" type="button">What is the best app for a trading journal?</button>
</h3>
<div class="accordion-collapse collapse show" data-bs-parent="#postFaq" id="postFaq-0">
<div class="accordion-body">A simple spreadsheet works well. What matters is recording every trade consistently, not the tool.</div>
</div>
</div>
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-1" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#postFaq-1" data-bs-toggle="collapse" type="button">What does R mean in trading?</button>
</h3>
<div class="accordion-collapse collapse" data-bs-parent="#postFaq" id="postFaq-1">
<div class="accordion-body">R is the amount you risked on a trade. If you risked $5 and made $10, the result is +2R.</div>
</div>
</div>
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-2" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#postFaq-2" data-bs-toggle="collapse" type="button">How often should I review my journal?</button>
</h3>
<div class="accordion-collapse collapse" data-bs-parent="#postFaq" id="postFaq-2">
<div class="accordion-body">A short review after each session and a deeper review once a week is a good routine.</div>
</div>
</div>
</div>$tw$,$tw$strategy$tw$,$tw$/assets/images/blog/trading-journal-improve-results.webp$tw$,$tw$Discover why a trading journal is the fastest way to improve, what to record for every trade, and how to review your journal weekly to fix costly mistakes.$tw$,$tw$trading journal, trade journal template, improve trading results, trading psychology, review trades$tw$,6,true,'2026-07-27T09:00:00+05:00')
on conflict (slug) do nothing;

insert into public.posts (slug,title,excerpt,content,category,cover_url,meta_description,keywords,read_minutes,published,published_at)
values ($tw$volatility-indices-explained$tw$,$tw$Volatility Indices on Deriv: V10, V25, V75 and V100 Explained$tw$,$tw$What the number in V75 or V25 actually measures, how 1-second indices differ, and how to match an index to your experience level.$tw$,$tw$<p>Volatility indices are the backbone of Deriv's synthetic markets. "V75" is probably the most searched synthetic index in Pakistan — but many traders open it without knowing what the 75 actually means. Let's fix that.</p>
<h2>What is a volatility index?</h2>
<p>A volatility index on Deriv is a synthetic market that moves randomly with a <strong>constant level of volatility</strong>. Unlike real markets, it does not get quieter at night or wilder during news. The behaviour stays consistent around the clock, every day of the week.</p>
<h2>What the number means</h2>
<p>The number is the volatility percentage the index is designed to maintain:</p>
<ul>
<li><strong>Volatility 10 (V10)</strong> — 10% volatility, the calmest.</li>
<li><strong>Volatility 25 (V25)</strong> — 25% volatility.</li>
<li><strong>Volatility 50 (V50)</strong> — 50% volatility.</li>
<li><strong>Volatility 75 (V75)</strong> — 75% volatility, fast and aggressive.</li>
<li><strong>Volatility 100 (V100)</strong> — 100% volatility, the most active of the classic set.</li>
</ul>
<p>Higher volatility means bigger average price moves in the same amount of time — bigger opportunities and bigger losses if your stop is too tight or your lot too large.</p>
<h2>Regular vs 1-second indices</h2>
<p>The classic volatility indices update their price every two seconds. Deriv also offers <strong>1-second (1s)</strong> versions, such as Volatility 75 (1s), which update every second. Some additional 1s indices exist with other volatility levels. Faster ticks mean faster candles, which suits scalpers but punishes hesitation.</p>
<h2>How to choose the right index</h2>
<div class="table-wrap"><table>
<thead><tr><th>Trader profile</th><th>Suitable starting point</th><th>Why</th></tr></thead>
<tbody>
<tr><td>Complete beginner</td><td>V10 or V25 on demo</td><td>Slower moves, easier to read structure</td></tr>
<tr><td>Learning price action</td><td>V25 or V50</td><td>Clean swings with manageable range</td></tr>
<tr><td>Experienced, strict risk</td><td>V75 or V100</td><td>Large moves; requires wider stops and smaller lots</td></tr>
</tbody></table></div>
<h2>Practical tips for trading volatility indices</h2>
<ol>
<li><strong>Use the same chart routine every time.</strong> Start on H1 to find the direction, then refine entries on M5 or M15.</li>
<li><strong>Adjust your stop to the index.</strong> A 50-point stop that is fine on V25 may get hit instantly on V75.</li>
<li><strong>Size by risk, not by habit.</strong> Calculate your lot from the stop distance and your fixed risk percentage.</li>
<li><strong>Do not jump between indices.</strong> Each one has its own rhythm. Stick to one or two until your journal shows consistency.</li>
</ol>
<div class="callout"><strong>Check the specification</strong>Minimum lot sizes and contract details differ between indices and can change. In MT5, right-click the symbol, select Specification and confirm before trading.</div>
<h2>Volatility indices vs Boom and Crash</h2>
<p>Volatility indices move in both directions without the sudden one-way spikes of <a href="post.html?slug=boom-and-crash-indices-explained">Boom and Crash</a>. That makes them a better classroom for learning trend, support, resistance and candlestick behaviour — skills that also transfer to forex and gold.</p>
<aside class="takeaways">
<h2>Key Takeaways</h2>
<ul class="check-list"><li>The number in V10–V100 is the constant volatility level of the index.</li><li>1s indices update every second; classic ones update every two seconds.</li><li>Beginners should start with V10 or V25 on demo.</li><li>Adjust stop distance and lot size to each index's volatility.</li></ul>
</aside>
<h2>Frequently Asked Questions</h2>
<div class="accordion faq-accordion" id="postFaq">
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-0" aria-expanded="true" class="accordion-button" data-bs-target="#postFaq-0" data-bs-toggle="collapse" type="button">Is V75 good for beginners?</button>
</h3>
<div class="accordion-collapse collapse show" data-bs-parent="#postFaq" id="postFaq-0">
<div class="accordion-body">V75 moves quickly and can cause large losses with oversized lots. Most beginners are better off learning on V10 or V25 first, then moving up once their risk management is consistent.</div>
</div>
</div>
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-1" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#postFaq-1" data-bs-toggle="collapse" type="button">Do volatility indices close at night?</button>
</h3>
<div class="accordion-collapse collapse" data-bs-parent="#postFaq" id="postFaq-1">
<div class="accordion-body">No. They run 24/7 with constant volatility, including weekends and holidays.</div>
</div>
</div>
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-2" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#postFaq-2" data-bs-toggle="collapse" type="button">Does news affect volatility indices?</button>
</h3>
<div class="accordion-collapse collapse" data-bs-parent="#postFaq" id="postFaq-2">
<div class="accordion-body">No. They are synthetic and are not linked to any real market, so economic news does not move them.</div>
</div>
</div>
</div>$tw$,$tw$synthetic-indices$tw$,$tw$/assets/images/blog/volatility-indices-explained.webp$tw$,$tw$Learn how Deriv volatility indices work, what V10, V25, V50, V75 and V100 mean, how the 1-second versions differ and how to pick the right index for your strategy.$tw$,$tw$volatility 75 index, v75, deriv volatility indices, v10, v25, v100, 1s indices$tw$,7,true,'2026-09-08T09:00:00+05:00')
on conflict (slug) do nothing;

insert into public.posts (slug,title,excerpt,content,category,cover_url,meta_description,keywords,read_minutes,published,published_at)
values ($tw$what-is-deriv-beginners-guide$tw$,$tw$What Is Deriv? A Complete Beginner's Guide to the Broker$tw$,$tw$A clear introduction to Deriv: the markets it offers, how synthetic indices differ from forex, the main platforms and the first steps every beginner should take.$tw$,$tw$<p>If you have spent any time in Pakistani trading groups, you have heard the name <strong>Deriv</strong>. Boom and Crash, Volatility 75, "V75 scalping" — almost all of it happens on Deriv. But before you deposit a single dollar, you should understand what the broker actually is, what you can trade there and where beginners usually go wrong.</p>
<p>This guide is written for complete beginners who join our free monthly batch. It covers the basics in plain language so you can make informed decisions.</p>
<h2>Deriv in simple words</h2>
<p>Deriv is an online broker that lets you trade derivatives — contracts whose price follows an underlying market. You do not buy the real asset (for example physical gold); you open a position that gains or loses value as the price moves.</p>
<p>The company has a long history in online trading. It grew out of Binary.com, which started in 2000, and rebranded as Deriv in 2020. Today it operates through several entities regulated in different jurisdictions. The entity you register with depends on your country of residence, so always read the terms shown during sign-up.</p>
<h2>What can you trade on Deriv?</h2>
<p>Deriv offers two broad groups of markets:</p>
<ul>
<li><strong>Financial markets</strong> — forex pairs (EURUSD, GBPUSD and more), commodities such as gold (XAUUSD) and oil, stock indices, stocks, ETFs and cryptocurrencies. These follow real-world prices and move with news and sessions.</li>
<li><strong>Derived / synthetic indices</strong> — markets created by Deriv that simulate real-world volatility. Examples are Volatility indices, Boom and Crash, Jump, Step and Range Break indices.</li>
</ul>
<h2>What makes synthetic indices different?</h2>
<p>Synthetic indices are the main reason many traders choose Deriv. Their prices are generated by a cryptographically secure random number generator, and Deriv states that the process is audited for fairness by an independent third party. Because they are not linked to a real economy:</p>
<ul>
<li>They are open <strong>24 hours a day, 7 days a week</strong>, including weekends and public holidays.</li>
<li>News events such as interest-rate decisions do not move them.</li>
<li>Each index has a fixed volatility or behaviour pattern — for example, Boom 1000 averages one upward spike every 1,000 ticks.</li>
</ul>
<div class="callout"><strong>Important</strong>Random does not mean easy. Synthetic indices can move fast and the spikes can wipe out an account that uses oversized lots. The same risk rules apply as in any other market.</div>
<h2>The main Deriv platforms</h2>
<p>You can trade through several platforms, all available from one Deriv account:</p>
<ul>
<li><strong>Deriv MT5</strong> — the MetaTrader 5 platform for CFDs on forex, gold and synthetic indices. This is what we use in most of our signals and live sessions.</li>
<li><strong>Deriv cTrader</strong> — an alternative CFD platform with a modern interface.</li>
<li><strong>Deriv Trader</strong> — a web platform for options, multipliers and accumulators.</li>
<li><strong>Deriv Bot</strong> — a visual, block-based tool for building automated strategies.</li>
</ul>
<p>We compare them in detail in <a href="post.html?slug=deriv-platforms-compared">Deriv platforms compared</a>.</p>
<h2>Demo account first, always</h2>
<p>Every Deriv account comes with a demo account funded with virtual money. Use it. A demo lets you learn order types, lot sizes and platform controls without paying for mistakes. In our batches we ask beginners to practise on demo until they can follow a plan consistently for at least two to three weeks.</p>
<h2>Common beginner mistakes on Deriv</h2>
<ol>
<li><strong>Starting with large lots</strong> because the account balance "looks" big on synthetic indices.</li>
<li><strong>Trading without a stop loss</strong>, hoping a spike will come back.</li>
<li><strong>Switching indices every day</strong> instead of learning the behaviour of one or two.</li>
<li><strong>Copying signals blindly</strong> without understanding entry, stop loss and risk.</li>
<li><strong>Skipping verification</strong> and then facing delays when it is time to withdraw.</li>
</ol>
<h2>Your first steps</h2>
<p>Here is the simple path we recommend:</p>
<ol>
<li>Open and verify your account — see our <a href="post.html?slug=how-to-open-deriv-account">step-by-step account guide</a>.</li>
<li>Set up Deriv MT5 and practise on demo — follow the <a href="post.html?slug=deriv-mt5-setup-guide">MT5 setup guide</a>.</li>
<li>Learn one market deeply, for example <a href="post.html?slug=boom-and-crash-indices-explained">Boom and Crash</a>.</li>
<li>Write down your risk rules before going live — read <a href="post.html?slug=risk-management-synthetic-indices">risk management for synthetic indices</a>.</li>
</ol>
<aside class="takeaways">
<h2>Key Takeaways</h2>
<ul class="check-list"><li>Deriv is a broker for derivatives on financial markets and its own synthetic indices.</li><li>Synthetic indices trade 24/7 and are not affected by economic news.</li><li>Deriv MT5 is the most popular platform for forex, gold and synthetic indices.</li><li>Practise on the free demo account before trading real money.</li></ul>
</aside>
<h2>Frequently Asked Questions</h2>
<div class="accordion faq-accordion" id="postFaq">
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-0" aria-expanded="true" class="accordion-button" data-bs-target="#postFaq-0" data-bs-toggle="collapse" type="button">Is Deriv available in Pakistan?</button>
</h3>
<div class="accordion-collapse collapse show" data-bs-parent="#postFaq" id="postFaq-0">
<div class="accordion-body">Deriv accepts clients from many countries, including Pakistan. Availability of specific products depends on your country of residence, so check what is offered during sign-up.</div>
</div>
</div>
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-1" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#postFaq-1" data-bs-toggle="collapse" type="button">Are synthetic indices real markets?</button>
</h3>
<div class="accordion-collapse collapse" data-bs-parent="#postFaq" id="postFaq-1">
<div class="accordion-body">No. They are simulated markets generated by a random number generator. They copy real-world style volatility but are not linked to any real asset or economy.</div>
</div>
</div>
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-2" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#postFaq-2" data-bs-toggle="collapse" type="button">Can I trade on Deriv on weekends?</button>
</h3>
<div class="accordion-collapse collapse" data-bs-parent="#postFaq" id="postFaq-2">
<div class="accordion-body">Yes. Synthetic indices are open 24/7, including weekends. Forex and gold follow normal market hours and close on weekends.</div>
</div>
</div>
</div>$tw$,$tw$deriv-basics$tw$,$tw$/assets/images/blog/what-is-deriv-beginners-guide.webp$tw$,$tw$Learn what Deriv is, which markets you can trade, how synthetic indices work, the main Deriv platforms and the first steps a beginner should take before trading.$tw$,$tw$what is deriv, deriv broker, deriv for beginners, deriv synthetic indices, deriv pakistan$tw$,8,true,'2026-09-28T09:00:00+05:00')
on conflict (slug) do nothing;

insert into public.posts (slug,title,excerpt,content,category,cover_url,meta_description,keywords,read_minutes,published,published_at)
values ($tw$xauusd-gold-scalping-deriv-mt5$tw$,$tw$XAUUSD Gold Scalping on Deriv MT5: A Beginner-Friendly Framework$tw$,$tw$When gold moves, which news to avoid, and a simple level-based scalping framework with clear stop loss and lot size rules.$tw$,$tw$<p>Gold (XAUUSD) is one of the most traded instruments in our community. It moves fast, respects technical levels well and offers many opportunities in a single session. Those same qualities make it dangerous for scalpers without a plan.</p>
<h2>Why gold is different from synthetic indices</h2>
<p>Gold is a real market. Its price reacts to the US dollar, interest-rate expectations, inflation data and global risk sentiment. That means:</p>
<ul>
<li>It trades during normal market hours and closes on weekends.</li>
<li>Spreads can widen around the daily rollover and during major news.</li>
<li>Scheduled economic releases can move price sharply in seconds.</li>
</ul>
<h2>The best times to scalp gold</h2>
<p>Gold is most active during the <strong>London session</strong> and especially the <strong>London–New York overlap</strong>. In Pakistan time this is roughly the afternoon to late evening, depending on daylight saving changes. The quieter Asian session often produces small ranges that are harder to scalp.</p>
<h2>News you should know about</h2>
<p>Check an economic calendar every day. High-impact US events often cause sudden moves:</p>
<ul>
<li>US CPI (inflation) data</li>
<li>Non-Farm Payrolls (NFP)</li>
<li>FOMC interest-rate decisions and press conferences</li>
</ul>
<p>A simple rule for beginners: <strong>no new scalps 15 minutes before and after high-impact news</strong>.</p>
<h2>A simple level-based scalping framework</h2>
<ol>
<li><strong>Mark levels on H1:</strong> previous day high and low, plus clear support and resistance zones.</li>
<li><strong>Find direction on M15:</strong> are highs and lows rising or falling?</li>
<li><strong>Enter on M1–M5:</strong> wait for price to reach a level in the direction of the M15 trend and show a rejection candle or a break-and-retest.</li>
<li><strong>Stop loss:</strong> beyond the level or the rejection candle, with a little extra room for spread.</li>
<li><strong>Target:</strong> the next level, aiming for at least 1:1.5 risk-to-reward.</li>
</ol>
<h2>Lot size on gold</h2>
<p>On many MT5 accounts, one standard lot of XAUUSD equals 100 ounces, so a $1 move in price is worth about $100 per lot — and $1 per 0.01 lot. Always confirm the contract size in the symbol's Specification on your own account. Then size the trade so the stop-loss distance equals your fixed 1–2% risk.</p>
<div class="callout is-warning"><strong>Example</strong>Account: $500. Risk: 1% = $5. Stop distance: $2.50 in price. At about $1 per $1 move for 0.01 lot, a 0.02 lot gives roughly $5 risk. Larger lots would break your rule.</div>
<h2>Mistakes gold scalpers make</h2>
<ul>
<li>Scalping during news and getting stopped out by spread spikes.</li>
<li>Taking ten trades in an hour after one loss.</li>
<li>Using stops that are too tight for gold's normal noise.</li>
<li>Ignoring the higher-timeframe trend.</li>
</ul>
<p>Practise this framework on demo for at least two weeks and log every trade. Gold rewards patience far more than speed.</p>
<aside class="takeaways">
<h2>Key Takeaways</h2>
<ul class="check-list"><li>Scalp gold mainly during the London and London–New York sessions.</li><li>Avoid new trades around CPI, NFP and FOMC releases.</li><li>Use H1 levels, M15 direction and M1–M5 entries.</li><li>Confirm the contract size and calculate lots from your stop distance.</li></ul>
</aside>
<h2>Frequently Asked Questions</h2>
<div class="accordion faq-accordion" id="postFaq">
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-0" aria-expanded="true" class="accordion-button" data-bs-target="#postFaq-0" data-bs-toggle="collapse" type="button">Can I trade gold on Deriv MT5?</button>
</h3>
<div class="accordion-collapse collapse show" data-bs-parent="#postFaq" id="postFaq-0">
<div class="accordion-body">Yes. XAUUSD is available on Deriv MT5 accounts that include financial markets. Check the symbol list in your account.</div>
</div>
</div>
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-1" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#postFaq-1" data-bs-toggle="collapse" type="button">What is the best timeframe for gold scalping?</button>
</h3>
<div class="accordion-collapse collapse" data-bs-parent="#postFaq" id="postFaq-1">
<div class="accordion-body">Many scalpers enter on M1 or M5 but take direction from M15 and levels from H1. Higher-timeframe context filters out many bad trades.</div>
</div>
</div>
<div class="accordion-item">
<h3 class="accordion-header m-0">
<button aria-controls="postFaq-2" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#postFaq-2" data-bs-toggle="collapse" type="button">Does gold trade on weekends?</button>
</h3>
<div class="accordion-collapse collapse" data-bs-parent="#postFaq" id="postFaq-2">
<div class="accordion-body">No. Gold follows the global market schedule and is closed on weekends, unlike Deriv's synthetic indices.</div>
</div>
</div>
</div>$tw$,$tw$strategy$tw$,$tw$/assets/images/blog/xauusd-gold-scalping-deriv-mt5.webp$tw$,$tw$Learn how to approach gold (XAUUSD) scalping on Deriv MT5: the best trading sessions, key news events, simple setups, stop loss placement and lot sizing.$tw$,$tw$xauusd scalping, gold scalping strategy, deriv gold, xauusd deriv mt5, gold trading sessions$tw$,7,true,'2026-08-05T09:00:00+05:00')
on conflict (slug) do nothing;
